import React, { Component } from 'react';
import english from "../langs/en.translations.json";
import french from "../langs/fr.translations.json";
import { LocalizeContextProps, withLocalize } from "react-localize-redux";
import { DateTimeEnum, LangEnum } from "../constants/enums";
import { Layout, Spin } from "antd";
import { pageRouter } from "../data/page-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "@reduxjs/toolkit";
import { ConnectedProps, connect } from "react-redux";
import Page404 from "./page-404";
import AppHeader from './app-header';
import { commonActions } from '../store/common/common.actions';
import { soaActions } from '../store/soa/soa.actions';
import { soaService } from '../services/soa.service';
import Home from './home';

const { Content } = Layout;

const mapStateToProps = (state: any) => {
  return {
    loadSpin: state.commonReducer.loadSpin,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    startSpin: commonActions.startSpin,
    stopSpin: commonActions.stopSpin,
    setDataLang: soaActions.setDataLang,
  }, dispatch);
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & LocalizeContextProps & {
  loadSpin?: any;
};

interface IState {
  lang: string,
  menu: any
};

class App extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    let query = new URLSearchParams(window.location.search);

    var langDefault = query.get("lang") || localStorage.getItem("lang") as string;
    if (langDefault !== LangEnum.FR && langDefault !== LangEnum.EN) {
      langDefault = LangEnum.EN;
    }

    localStorage.setItem("lang", langDefault);

    this.props.initialize({
      languages: [
        { code: LangEnum.EN, name: "English", },
        { code: LangEnum.FR, name: "French", },
      ],
      translation: english,
      options: {
        onMissingTranslation: ({ translationId }) => translationId,
        renderToStaticMarkup: false,
        renderInnerHtml: true,
        defaultLanguage: langDefault,
      },
    });
    this.props.addTranslationForLanguage(english, LangEnum.EN);
    this.props.addTranslationForLanguage(french, LangEnum.FR);

    console.log("langDefault", langDefault);
    this.state = {
      lang: langDefault,
      menu: []
    };
    this.callApi(langDefault);
  }

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener('resize', e => this.handleWindowResize());
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', e => this.handleWindowResize());
  }



  handleWindowResize() {
    // let windowSize = this.getWindowSize();
  }

  getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  onChangeLang(value: string) {
    console.log("onChangeLang", value);
    this.setState({
      lang: value
    }, () => {
      localStorage.setItem("lang", value);
      this.props.setActiveLanguage(value);
      this.callApi(value);
    })
  }

  callApi(lang: string) {
    this.props.startSpin();
    soaService.getLang(lang).then((res: any) => {
      console.log("res", res);
      if (Array.isArray(res) && res.length > 0) {
        this.setState({
          menu: res[0].head_menu
        })
        this.props.setDataLang(res[0]);
      }
      this.props.stopSpin();
    }).catch((err: any) => {
      console.log(err);
      this.props.stopSpin();
    });
  }

  render() {
    let { lang, menu } = this.state;
    let { loadSpin, } = this.props;

    console.log("menu", menu);

    return (
      <Spin spinning={loadSpin > 0} size="large">
        <Layout>
          <AppHeader
            lang={lang}
            menu={menu}
            onChangeLang={(newLang) => this.onChangeLang(newLang)}
          />
          <Home />
          {/* <Content>
            <React.Suspense fallback={<Spin />}>
              <Routes>
                {pageRouter.map((k: any, i: number) => {
                  let Page = k.component;
                  return (
                    <Route
                      key={i}
                      path={k.path}
                      element={<Page />}
                    />
                  )
                }
                )}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </React.Suspense>
          </Content> */}
        </Layout>
      </Spin>
    );
  }
}


export default connector(withLocalize(App));
