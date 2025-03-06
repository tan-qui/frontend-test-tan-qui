import React, { Component } from 'react';
import { LocalizeContextProps, withLocalize } from "react-localize-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { ConnectedProps, connect } from "react-redux";
import { commonActions } from "../../store/common/common.actions";
import { Button, Calendar, Card, Col, Divider, Form, FormInstance, Image, Input, message, notification, Row, } from "antd";
import Page400 from "../page-400";
import Page500 from "../page-500";

import { RootState } from '../../store/app.reducer';
import { globalProps } from '../../data/props';
import { rules } from '../../data/rules';
import TextArea from 'antd/es/input/TextArea';
import { IMAGE } from '../../assets/images';
import { SVG } from '../../assets/svg';

import dayjs from 'dayjs';
import "dayjs/locale/fr";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localeData from "dayjs/plugin/localeData";
import weekday from 'dayjs/plugin/weekday';
import { VIDEO } from '../../assets/video';
import { motion } from 'framer-motion';

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(localeData);
dayjs.extend(weekday)
dayjs.locale("fr");

const iconMap = [
  { index: 0, image: SVG.mountainsBlack },
  { index: 1, image: SVG.fishingBlack },
  { index: 2, image: SVG.crosshairBlack },
];

const icon = [
  { index: 0, image: IMAGE.iconAuth },
  { index: 1, image: IMAGE.iconRespect },
  { index: 2, image: IMAGE.iconDiver },
  { index: 3, image: IMAGE.iconPerson },
  { index: 4, image: IMAGE.iconConfort },
];

const imageBlock1 = [
  { index: 0, image: IMAGE.imgBlock11 },
  { index: 1, image: IMAGE.imgBlock12 },
  { index: 2, image: IMAGE.imgBlock13 },
  { index: 3, image: IMAGE.imgBlock11 },
  { index: 4, image: IMAGE.imgBlock12 },
  { index: 5, image: IMAGE.imgBlock13 },
];

const imageBlock3 = [
  { index: 0, image: IMAGE.imgBlock31 },
  { index: 1, image: IMAGE.imgBlock32 },
  { index: 2, image: IMAGE.imgBlock33 },
  { index: 3, image: IMAGE.imgBlock31 },
  { index: 4, image: IMAGE.imgBlock32 },
  { index: 5, image: IMAGE.imgBlock33 },
];

const socialMediaCard = [
  { index: 0, image: IMAGE.socialMediaCard1 },
  { index: 1, image: IMAGE.socialMediaCard2 },
  { index: 2, image: IMAGE.socialMediaCard3 },
  { index: 3, image: IMAGE.socialMediaCard4 },
  { index: 4, image: IMAGE.socialMediaCard1 },
  { index: 5, image: IMAGE.socialMediaCard2 },
];

const fakeLocations = [
  { id: 1, type: 1, x: "10%", y: "40%", image: IMAGE.crosshairMappin },
  { id: 2, type: 2, x: "25%", y: "55%", image: IMAGE.fishingMappin },
  { id: 3, type: 3, x: "30%", y: "20%", image: IMAGE.mountainMappin },

  { id: 4, type: 1, x: "35%", y: "88%", image: IMAGE.crosshairMappin },
  { id: 5, type: 2, x: "40%", y: "70%", image: IMAGE.fishingMappin },
  { id: 6, type: 3, x: "45%", y: "20%", image: IMAGE.mountainMappin },

  { id: 7, type: 1, x: "50%", y: "35%", image: IMAGE.crosshairMappin },
  { id: 8, type: 2, x: "55%", y: "27%", image: IMAGE.fishingMappin },
  { id: 9, type: 3, x: "60%", y: "80%", image: IMAGE.mountainMappin },
];

const occupiedDates = [
  "2025-01-28", "2025-01-29", "2025-02-04",
];

const mapStateToProps = (state: RootState) => {
  return {
    dataFill: state.soaReducer.dataLang,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    startSpin: commonActions.startSpin,
    stopSpin: commonActions.stopSpin,
  }, dispatch);
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & LocalizeContextProps & {};

interface IState {
  page500: boolean,
  page400: boolean,
  pageMessage: string,
  origin: any,
  zoom: any,
  currentDate: any,
  locations: any[],
  lstBooking: any[]
};

class Home extends Component<IProps, IState> {
  formSend = React.createRef<FormInstance>()
  constructor(props: any) {
    super(props);
    this.state = {
      page500: false,
      page400: false,
      pageMessage: "",
      origin: { x: "50%", y: "50%" },
      zoom: undefined,
      currentDate: dayjs("2025-01-01"),
      locations: fakeLocations,
      lstBooking: []
    };
  }

  componentDidMount() {
    this.onClickMap();
  }

  componentWillUnmount() {

  }
  componentDidUpdate() {

  }

  onClickSendMail() {

  }

  onClickMarker(event: any, item: any) {
    event.stopPropagation();
    let { zoom } = this.state;
    const mapContainer = event.currentTarget.parentElement;
    const rect = mapContainer.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((event.clientY - rect.top) / rect.height) * 100;
    if (zoom === 5) {
      this.onClickMap();
    } else {
      this.setState({
        origin: { x: `${offsetX}%`, y: `${offsetY}%` },
        zoom: zoom + 1
      });
    }
  }

  onFilterLocation(index: number) {
    // hard code  1, 2, 3 tương ứng với CROSSHAIR, FISH, MOUNTAIN
    let locations = fakeLocations.filter(x => x.type == index + 1);
    this.setState({
      locations: locations
    });
  }

  onClickMap() {
    this.setState({
      origin: { x: `50%`, y: `50%` },
      zoom: 1,
      locations: fakeLocations
    });
  }


  handlePrevMonth = () => {
    this.setState({ currentDate: this.state.currentDate.subtract(1, "month") });
  };

  handleNextMonth = () => {
    this.setState({ currentDate: this.state.currentDate.add(1, "month") });
  };

  headerRender = () => {
    return (
      <Row className='row-customer-header-calendar'>
        <Col>
          <img src={SVG.arrowLeft} onClick={this.handlePrevMonth} />
          &nbsp;&nbsp;
          <label> {this.state.currentDate.format("MMMM YYYY")}</label>
          &nbsp;&nbsp;
          <img src={SVG.arrowRight} onClick={this.handleNextMonth} />
        </Col>
      </Row>
    );
  };

  dateCellRender = (value: any, info: any) => {
    if (info.type !== "date") return info.originNode;
    const dateStr = value.format("YYYY-MM-DD");
    const isOccupied = occupiedDates.includes(dateStr);
    const isCurrentMonth = value.isSame(this.state.currentDate, "month");
    let border = "1px solid #F2542D"; // Mặc định màu nền
    let backgroundColor = "#FFF4F1"; // Mặc định màu nền
    let color = "#562C2C"; // Mặc định màu chữ
    let text = "Libre";


    let { lstBooking } = this.state;

    if (isCurrentMonth) {
      border = "1px solid #F2542D";
      backgroundColor = "#FFF4F1";
      color = "#562C2C";
      if (isOccupied) {
        border = "1px solid #D7D7D7";
        backgroundColor = "#FFF";
        color = "#999999";
        text = "Occupé";
      }
    } else {
      border = "1px solid #DFDFDF";
      backgroundColor = "#F5F5F5";
      color = "#CCC";
      text = "";
      if (isOccupied) {
        border = "1px solid #D7D7D7";
        backgroundColor = "#FFF";
        color = "#999999";
        text = "Occupé";
      }
    }

    if (lstBooking.includes(dateStr)) {
      border = "1px solid #F2542D";
      backgroundColor = "#F2542D";
      color = "#FFF";
      text = "";
    }

    return (
      <div
        className='date-cell-calendar'
        style={{
          border: border,
          backgroundColor: backgroundColor,
          color: color,
        }}
      >
        {value.format("D")}
        <br />
        <label className='text-cell-calendar'>{text}</label>
      </div>
    );
  };



  onChangeCalendar = (date: any) => {
    console.log("onChangeCalendar", date);
  };

  onPanelChangeCalendar = (date: any, mode: any) => {
    console.log("onPanelChangeCalendar", date);
    console.log("onPanelChangeCalendar", mode);
  };


  onSelectCalendar = (date: any, selectInfo: any) => {
    console.log("onSelectCalendar", date);
    console.log("onSelectCalendar", selectInfo);
    let { lstBooking } = this.state;
    const dateStr = date.format("YYYY-MM-DD");

    if (occupiedDates.includes(dateStr)) {
      this.setState({
        lstBooking,
        currentDate: date
      });
      message.warning("The date is reserved.")
    } else {
      if (lstBooking.includes(dateStr)) {
        lstBooking = lstBooking.filter(d => d !== dateStr);
      } else {
        lstBooking.push(dateStr);
      }
    }
    console.log("lstBooking", lstBooking);
    this.setState({
      lstBooking,
      currentDate: date
    });

  };

  render() {
    let { page500, page400, pageMessage, origin, zoom, currentDate, locations } = this.state;
    let { dataFill } = this.props;


    if (page500) {
      return (<Page500 message={pageMessage}></Page500>)
    } else if (page400) {
      return (<Page400 message={pageMessage}></Page400>)
    }

    if (!dataFill) {
      return <React.Fragment></React.Fragment>;
    }

    return (
      <div className="screen-home">


        {/* banner */}
        <div className='main-banner'>
          {/* video */}
          <div className='hero-image-container'>
            <video
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
              src={VIDEO.pcHeroImage}
            />
          </div>

          <div className='row-icon-banner'>
            <div className='image-container'>
              <div>
                <img className='hover-image' loading='lazy' src={SVG.mountainsWhite} />
                <h5>Activites 1</h5>
              </div>
              <div>
                <img className='hover-image' loading='lazy' src={SVG.fishingWhite} />
                <h5>Activites 2</h5>
              </div>
              <div>
                <img className='hover-image' loading='lazy' src={SVG.crosshairWhite} />
                <h5>Activites 3</h5>
              </div>
            </div>
          </div>

          <div className='icon-chat'>
            <img className='hover-image' loading='lazy' src={SVG.chatWhite} />
          </div>

        </div>



        {/* bloc_1 */}
        <div className='bloc-1'>
          {/* title */}
          <Row {...globalProps.row12 as any} >
            <Col span={24}>
              <div>
                <Divider>
                  <label className='title-bloc'>{dataFill.bloc_1?.title}</label>
                </Divider>
              </div>
              <div className='txt-center'>
                <label className='sub-title-bloc'>{dataFill.bloc_1?.subtitle}</label>
              </div>
            </Col>
          </Row>
          {/* list */}
          <Row {...globalProps.row24 as any} className='bloc-1-cases-container'>
            {
              dataFill.bloc_1?.cases?.map((item: any, index: number) => {
                return (
                  <Col key={index} {...globalProps.colImage as any} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img className='image' loading='lazy' src={imageBlock1.find(x => x.index == index)?.image || IMAGE.imgBlock11} />
                    </motion.div>
                    <div><h2 className='title-case'>{item.category}</h2></div>
                    <div><h3 className='sub-title-case'>{item.tagline}</h3></div>
                    <div className='box-des'><p className='description-case'>{item.description}</p></div>
                    <div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Button type="default" shape="round" size="large" className='btn-case'>
                          <label>{item.cta}</label>&nbsp;&nbsp;
                          <Image sizes='12' loading='lazy' preview={false} src={SVG.arrowUpRight} />
                        </Button>
                      </motion.div>
                    </div>

                  </Col>
                );
              })
            }
          </Row>
        </div>

        <div className='bloc-2'>
          {/* title */}
          <Row {...globalProps.row12 as any} className='txt-center'>
            <Col span={24}>
              <div>
                <Divider>
                  <label className='title-bloc'>{dataFill.bloc_2?.title}</label>
                </Divider>
              </div>
            </Col>
          </Row>

          <div className='bloc-2-cases-container'>
            {
              dataFill.bloc_2?.cases?.map((item: string, index: number) => {
                return (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      icon={<Image sizes='12' loading='lazy' preview={false} src={
                        iconMap.find(x => x.index == index)?.image || SVG.mountainsWhite
                      } />}
                      type="default"
                      shape="round"
                      size="large"
                      className='btn-case'
                      key={index}
                      onClick={() => { this.onFilterLocation(index) }}
                    >
                      <label>{item}</label>
                    </Button>
                  </motion.div>
                );
              })
            }
          </div>

          {/* Map */}
          <Row {...globalProps.row12 as any} className='txt-center'>
            <Col span={24}>
              <div className="map-container" onClick={(e) => this.onClickMap()}>
                <div
                  className="map-wrapper"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: `${origin.x} ${origin.y}`,
                  }}
                >
                  <img src={IMAGE.pcBgMap}
                    alt="map"
                    className="map-image"
                  />
                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="map-marker"
                      style={{ top: loc.y, left: loc.x }}
                      onClick={(e) => this.onClickMarker(e, loc)}
                    >
                      <img src={loc.image} width={32} className='marker-img' loading='lazy' />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* bloc_2_2 */}
        <div className='bloc-2-2'>
          {/* title */}
          <Row {...globalProps.row12 as any} className='txt-center'>
            <Col span={24}>
              <div>
                <Divider>
                  <label className='title-bloc'>{dataFill.bloc_2_2?.title}</label>
                </Divider>
              </div>
            </Col>

            {/* Draw schedule */}
            <Col span={24}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className='card-calendar'>
                  <Calendar
                    defaultValue={currentDate}
                    fullscreen={true}
                    onChange={this.onChangeCalendar}
                    onPanelChange={this.onPanelChangeCalendar}
                    onSelect={this.onSelectCalendar}
                    mode='month'
                    value={currentDate}
                    headerRender={this.headerRender}
                    fullCellRender={this.dateCellRender}
                  />
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* form */}
          <Row {...globalProps.row12 as any} className='txt-center bloc-2-2-form'>
            <Col span={24}>
              <Form
                labelAlign="left"
                layout="horizontal"
                initialValues={{}}
                key={dataFill.bloc_2_2?.title}
                scrollToFirstError={true}
                onFinish={e => this.onClickSendMail()}
                ref={this.formSend}
              >
                <Row {...globalProps.row12 as any}>
                  <Col {...globalProps.colFull as any}>
                    <Form.Item
                      label={dataFill.bloc_2_2?.btn_1[0]}
                      name="name"
                      rules={[rules.required]}
                    >
                      <Input placeholder={dataFill.bloc_2_2?.btn_1[1]} />
                    </Form.Item>
                  </Col>
                  <Col {...globalProps.colFull as any}>
                    <Form.Item
                      label={dataFill.bloc_2_2?.btn_2[0]}
                      name="email"
                      rules={[rules.required]}
                    >
                      <Input placeholder={dataFill.bloc_2_2?.btn_2[1]} />
                    </Form.Item>
                  </Col>
                  <Col {...globalProps.colFull as any}>
                    <Form.Item
                      label={dataFill.bloc_2_2?.btn_3}
                      name="message"
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                  </Col>
                  <Col {...globalProps.colFull as any}>
                    <Form.Item
                      label={dataFill.bloc_2_2?.btn_4[0]}
                      name="file"
                    >
                      <label className="file-upload">
                        <span className="icon">
                          <Image width={24} sizes='12' loading='lazy' preview={false} src={SVG.attachment} />
                        </span>
                        <span className="text">{dataFill.bloc_2_2?.btn_4[1]}</span>
                        <input className="customer-file" type="file" accept="*" />
                        <span className="hint">{dataFill.bloc_2_2?.btn_4[2]}</span>
                      </label>
                    </Form.Item>
                  </Col>
                </Row>
                <Row {...globalProps.row12 as any} className='btn-submit-container'>
                  <Col>
                    <Button
                      type="default"
                      className='btn-reset'
                    >
                      <span>
                        {dataFill.bloc_2_2?.btn_5}
                      </span>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className='btn-confirm'
                    >
                      <span>{dataFill.bloc_2_2?.btn_6}&nbsp;&nbsp;</span>
                      <Image sizes='12' loading='lazy' preview={false} src={IMAGE.send} />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>

        {/* bloc_3 */}
        <div className='bloc-3'>
          {/* title */}
          <Row {...globalProps.row12 as any}>
            <Col {...globalProps.colFull as any}>
              <div className='title-bloc-3'>
                <h2>{dataFill.bloc_3?.title}</h2>
                {/* moblie hidden */}
                <div className='more-info-bloc-3'>
                  <label>{dataFill.bloc_3?.more_info}</label>
                  <img loading='lazy' src={SVG.arrowRightBlack} />
                </div>
              </div>
              {/* moble show */}
            </Col>

          </Row>
          {/* list */}
          <Row {...globalProps.row12 as any}>

            <Col {...globalProps.colFull as any} className='bloc-3-cases-container'>
              {
                dataFill.bloc_3?.cases?.map((item: any, index: number) => {
                  return (
                    <motion.div
                      className='bloc-3-cases'
                      key={index}
                      initial={{ opacity: 0, x: 200 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <img className='image' loading='lazy' src={imageBlock3.find(x => x.index == index)?.image || IMAGE.imgBlock31} />
                      <div><h2 className='title-case'>{item.category}</h2></div>
                      <div><h3 className='sub-title-case'>{item.tagline}</h3></div>
                      <div className='box-des'><p className='description-case'>{item.description}</p></div>
                    </motion.div>
                  );
                })
              }
            </Col>

            <Col {...globalProps.colFull as any} className='txt-center btn-learn-more-container'>
              <Button
                type="primary"
                className='btn-learn-more'
              >
                <span>{dataFill.bloc_3?.more_info}&nbsp;&nbsp;</span>
                <img loading='lazy' src={SVG.arrowRightWhite} />
              </Button>
            </Col>
          </Row>
        </div>

        {/* bloc_4 */}
        <div className='bloc-4'>

          <div className='bloc-4-container'>
            <motion.div
              className='bloc-4-text'
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className='title-bloc-4'>{dataFill.bloc_4?.title}</h2>
                <h2 className='text-title-bloc-4'>{dataFill.bloc_4?.text_title}</h2>
              </div>
              <div className='sub-title-bloc-4'>
                <h1>{dataFill.bloc_4?.subtitle}</h1>
              </div>
              <div className='text-bloc-4'>
                <p>{dataFill.bloc_4?.text}</p>
              </div>
            </motion.div>
            <motion.div
              className='bloc-4-image'
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img loading='lazy' src={IMAGE.iceCream} />
            </motion.div>
          </div>

          <Row {...globalProps.row12 as any} className='txt-center bloc-4-cases-container'>
            {dataFill.bloc_4?.pictos?.map((picto: any, index: number) => (
              <Col key={index} >
                <div><motion.img
                  loading="lazy"
                  className="image"
                  src={icon.find(x => x.index == index)?.image || IMAGE.iconAuth}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                /></div>
                <div className='icon-tilte'>
                  <h2>{picto.title}</h2>
                </div>
                <div className='icon-des'>
                  <span>{picto.description}</span>
                </div>
              </Col>
            ))}
          </Row>

        </div>


        {/* bloc_5 */}
        <div className='bloc-5'>

          <Row {...globalProps.row12 as any} className='row-title'>
            <Col {...globalProps.colEqual as any}>
              <div className='title-bloc-5'><h2>{dataFill.bloc_5?.title}</h2></div>
            </Col>
            <Col {...globalProps.colEqual as any}>
              <div className='text-bloc-5'><p>{dataFill.bloc_5?.text}</p></div>
            </Col>
          </Row>


          <Row {...globalProps.row12 as any} className='row-inside'>
            <Col {...globalProps.colFull as any}>
              <div className='bg-image'>
                <img loading='lazy' src={IMAGE.bgLafamille} />
              </div>

              <motion.div
                className='card-inside'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
                viewport={{ once: true }}
              >
                <img loading='lazy' src={IMAGE.familleInside} />
                <div className='title-inside'>
                  <h2>La famille</h2>
                  <p>24 Sep 2024</p>
                </div>
                <div className='des-inside'>
                  <span className='des'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
                </div>
              </motion.div>
            </Col>
          </Row>

          <Row {...(globalProps.row12 as any)} className="txt-center review-container">
            {dataFill.bloc_5?.reviews?.map((item: any, index: number) => (
              <Col key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="image-review"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <img loading="lazy" src={socialMediaCard.find(x => x.index == index)?.image} />
                  </motion.div>

                  <motion.div
                    className="text-inside"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img loading="lazy" src={IMAGE.mdiInstagram} />
                    <motion.label
                      className="author"
                      whileHover={{ color: "#f2542d" }}
                    >
                      {item.author}
                    </motion.label>
                    <motion.img
                      loading="lazy"
                      src={SVG.arrowUpRightWhite}
                      whileHover={{ rotate: 15 }}
                    />
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
          <Row {...globalProps.row12 as any} className='txt-center '>
            <Col span={24} >
              <div className='footer-bloc-5'>
                <label>{dataFill.bloc_5?.footer}</label>
              </div>
            </Col>
          </Row>
        </div>


        {/* bloc_6 */}
        <div className='bloc-6' >
          <Row {...globalProps.row12 as any} className='txt-center'>
            <Col span={24}>
              <div className='bg-image-discover'>
                <Image loading='lazy' src={IMAGE.imageDiscover} preview={false} />
              </div>
              <div className='content-discover'>
                <div>
                  <h2 className='title-discover'>{dataFill.bloc_6?.title}</h2>
                  <h2 className='sub-title-discover'>{dataFill.bloc_6?.subtitle}</h2>
                  <p className='text-discover'>{dataFill.bloc_6?.text}</p>
                </div>
                <div>
                  <Button type="default" shape="round" size="large" className='btn-confirm'>
                    <span>{dataFill.bloc_6?.button}</span>
                  </Button>
                </div>
              </div>

            </Col>
          </Row>
        </div>

        {/* footer */}

        <div className='footer'>
          <Row {...globalProps.row12 as any} className='row-footer'>
            <Col {...globalProps.colFooterLeft as any} className='col-footer-address'>
              <div>
                <p>{dataFill.footer?.address?.name}</p>
              </div>
              <div>
                <p>{dataFill.footer?.address?.phone}</p>
              </div>
              <div>
                <p>{dataFill.footer?.address?.location}</p>
              </div>
            </Col>
            <Col {...globalProps.colFooterRight as any}>
              <Row {...globalProps.row12 as any} className='row-links'>
                {dataFill.footer?.links?.map((item: any, index: number) => (
                  <Col key={index} {...globalProps.col as any}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className='name'>{item.name}</p>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <div className='display-footer'>
            <div><p> © BASIC 2024</p></div>
            <div className='social-media'>
              <Image loading='lazy' src={IMAGE.fb} preview={false} />
              <Image loading='lazy' src={IMAGE.ins} preview={false} />
              <Image loading='lazy' src={IMAGE.ytb} preview={false} />
            </div>
          </div>

        </div>

      </div >
    );
  }
}


export default connector(withLocalize(Home));
