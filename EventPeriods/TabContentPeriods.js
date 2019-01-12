import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NotificationContainer } from 'react-notifications';
import Tabs from '../../components/SimpleTabs/Tabs';
import PriceNotification from '../../containers/PriceNotification';
import PeriodsArray from './PeriodsArray';
import Period from './Period';
import GetEventPeriodsInfo from '../../utils/GetEventPeriodsInfo';
import TabTittleEvent from '../../components/TabTittleEvent';
import moment from 'moment/moment';

class TabContentPeriods extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fixedEventDateList: [],
      periodicalEventDateList: [],
      dataLoaded: false,
      showErrorMessage: false,
      showTab: false,
      isPaid: true,
      pageName: '',

    };
  }

  componentDidMount() {
    const { dispatch, typePage } = this.props;
    const type = this.props.typeURL;
    const GetPageInfoPath = this.props.loadDataUrl;
    GetEventPeriodsInfo.bind(this)(dispatch, type, typePage, GetPageInfoPath);
  }

  handleFixedEventDate = (idx) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.fixedEventDateList.splice(idx, 1);
      return newState;
    });
  };

  sortFixedEventDate = () => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.fixedEventDateList.sort((first, second) => (moment(new Date((first.begin_date).split(' ')[0])).toDate() >= moment(new Date((second.begin_date).split(' ')[0])).toDate()) ? 1 : -1);
      return newState;
    });
  };

  setBeginDate = (idx, date) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.fixedEventDateList[idx].begin_date = date;
      return newState;
    });
  };

  getEmptyPeriodObj = () => ({
    id: '',
    begin_date: '',
    end_date: '',
    end_collection_orders_date: '',
  });


  addItemToFixedEventDateList = () => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.fixedEventDateList.push(this.getEmptyPeriodObj());
      return newState;
    });
  };

  render() {
    const errorMessage = (this.props.error_message) ? ((Object.keys(this.props.error_message).length) ? this.props.error_message : null) : null;

    if (!this.state.isPaid) {
      return (<PriceNotification/>);
    }

    if (this.state.showErrorMessage) {
      return (<div className='status-error'>{ (errorMessage) && errorMessage.message }</div>);
    }

    return (this.state.dataLoaded && <div className="flex-content">
      <main className='event-periods'>
        <form className='form-wrapper'>
          <div className="form-content">
            <TabTittleEvent pageName={this.state.pageName}/>
            <h4 className="tab-title"><span>Даты проведения</span> мероприятия</h4>
            <Tabs>
              <div displayLabel='Фиксированные' label='Фиксированные'>
                {(this.state.fixedEventDateList.length !== 0)
                  ? (
                      <PeriodsArray name="event-periods">
                        {
                          this.state.fixedEventDateList.map((item, index) => (
                              <Period
                                key={(item.id !== '') ? (item.id) : index}
                                index={index}
                                name='fixed-eventdate'
                                removeFunction={ () => { this.handleFixedEventDate(index); } }
                                sortFunction={this.sortFixedEventDate}
                                setBeginDateFunction={ (date) => { this.setBeginDate(index, date); } }
                                id={item.id}
                                startDate={item.begin_date}
                                endDate={item.end_date}
                                pricePercent={item.price_percent}
                                general={item.general}
                                collectionEndDate={item.end_collection_orders_date}
                                saveDataUrl={this.props.saveDataUrl}
                                typeSaveURL={this.props.typeSaveURL}
                              />))
                        }
                      </PeriodsArray>
                  ) : (<div className='tab-content_empty'>У мероприятия нет даты проведения</div>)

                }
                <div className="faq-btn">
                  <button type="button"
                          onClick={this.addItemToFixedEventDateList}
                          className="button addMore_btn">
                    Добавить период проведения еще...
                  </button>
                </div>
              </div>
              <div displayLabel='Периодические' label='Периодические'>
                {
                  (this.state.periodicalEventDateList.length !== 0)
                    ? (
                        <PeriodsArray name="events">
                        {
                          this.state.periodicalEventDateList.map((item, index) => (
                              <Period
                                key={(item.id !== '') ? (item.id) : index}
                                index={index}
                                name='periodical-eventdate'
                                id={item.id}
                              />))
                        }
                      </PeriodsArray>
                    ) : (<div className='tab-content_empty'>У мероприятия нет даты проведения</div>)
                }
              </div>
            </Tabs>
          </div>
        </form>
      </main>
      <NotificationContainer/>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    reduxState: state,
    error_message: state.getErrorMessage,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContentPeriods);
