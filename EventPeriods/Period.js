import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ModalWindow from '../../components/ModalWindow';
import createNotification from '../../components/Notification';

class Period extends Component {
  constructor(props, context) {
    super(props, context);
    this.saveDataUrl = this.props.saveDataUrl;
    this.typeSaveURL = this.props.typeSaveURL;
    this.state = {
      data: {
        id: this.props.id,
        price_percent: this.props.pricePercent,
        general: this.props.general,
        begin_date: (this.props.startDate !== '') ? moment(new Date((this.props.startDate).split(' ')[0])) : '',
        end_date: (this.props.endDate !== '') ? moment(new Date((this.props.endDate).split(' ')[0])) : '',
        end_collection_orders_date: (this.props.collectionEndDate !== '') ? moment(new Date((this.props.collectionEndDate).split(' ')[0])) : '',
      },
      showModal: false,
      activeDatePicker: false,

    };
  }

  handleDatePickerStart = (e) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.data.begin_date = e;
      return newState;
    });
    if (this.state.data.id === '') {
      this.setState((prev) => {
        const newState = { ...prev };
        newState.data.end_collection_orders_date = e;
        return newState;
      });
    }

    const { setBeginDateFunction } = this.props;
    setBeginDateFunction(e.format('YYYY-MM-DD HH:mm:ss'));
  };

  handleDatePickerEnd = (e) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.data.end_date = e;
      return newState;
    });
  };

  handleDatePickerEndCollectionDate = (e) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.data.end_collection_orders_date = e;
      return newState;
    });
  };

  handleChangePercent = (e) => {
    const { value } = e.target;

    this.setState((prev) => {
      const newState = { ...prev };
      newState.data.price_percent = value;
      return newState;
    });
  };

  editPeriod = (e) => {
    e.preventDefault();
    this.setState((prev) => {
      const newState = { ...prev };
      newState.activeDatePicker = true;
      return newState;
    });
  };

  removePeriod = (e) => {
    const { removeFunction } = this.props;
    e.preventDefault();
    const item = {
      id: this.state.data.id,
      delete: true,
    };

    fetch(this.saveDataUrl(this.typeSaveURL), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (response.status !== 200) {
          createNotification('error');
        }
        removeFunction();
        createNotification('success');
      });
  };

  handleToggleModal = () => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.showModal = !prev.showModal;
      return newState;
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { sortFunction } = this.props;
    Date.prototype.toJSON = function(){ return moment(this).format(); };
    const item = { ...this.state.data };
    item.begin_date = new Date(item.begin_date);
    item.end_collection_orders_date = new Date(item.end_collection_orders_date);
    item.end_date = new Date(item.end_date);

    this.setState((prev) => {
      const newState = { ...prev };
      newState.preloaderOn = true;
      return newState;
    });

    fetch(this.saveDataUrl(this.typeSaveURL), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(item),
    })
      .then((response) => {
        this.setState((prev) => {
          const newState = { ...prev };
          newState.preloaderOn = false;
          return newState;
        });
        if (response.status === 200) {
          sortFunction();
          createNotification('success');
        } else {
          createNotification('error');
        }
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.data.id = data.data.id;
          newState.data.end_date = moment(new Date((data.data.end_date).split(' ')[0]));
          newState.data.begin_date = moment(new Date((data.data.begin_date).split(' ')[0]));
          newState.data.end_collection_orders_date = moment(new Date((data.data.end_collection_orders_date).split(' ')[0]));
          newState.activeDatePicker = false;
          return newState;
        });
      });
  };

  render() {
    return (<div className="admin-card">
        {this.state.showModal && <ModalWindow onCloseRequest={() => this.handleToggleModal()}>
          <div className="textModal">
            <h2>Вы действительно хотите удалить период?</h2>
            <p>Этот обьект будет немедленно удален. Это действие необратимо.</p>
            <div className="modal__btn">
              <button type="button" className="button button_big" onClick={this.removePeriod}>Удалить</button>
            </div>
          </div>
        </ModalWindow>}
        <div className="period-card">
          {
            this.state.data.general && <div className="mark__wrapp"><span className="mark">Основной</span></div>
          }
          <div className="row">
            <div className="column _25">
              <div className="admin-card__date">
                <h4 className="admin-card__title">Дата <span> начала </span></h4>
                <label className="data-form">
                  <DatePicker
                    selected={this.state.data.begin_date}
                    onChange={this.handleDatePickerStart}
                    disabled={!!(this.state.data.id && !this.state.activeDatePicker)}
                    dateForm="MM/DD/YYYY"
                    name={`${this.name}.start_date`}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    placeholderText="Выберите дату"
                  />
                </label>
              </div>
            </div>
            <div className="column _25">
              <div className="admin-card__date">
                <h4 className="admin-card__title">Дата <span>окончания</span></h4>
                <label className="data-form">
                  <DatePicker
                    selected={this.state.data.end_date}
                    onChange={this.handleDatePickerEnd}
                    disabled={!!(this.state.data.id && !this.state.activeDatePicker)}
                    dateForm="MM/DD/YYYY"
                    name={`${this.name}.start_date`}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    placeholderText="Выберите дату"
                  />
                </label>
              </div>
            </div>
            <div className="column _25">
              <div className="admin-card__date">
                <h4 className="admin-card__title"> Дата окончания <span>сбора заявок</span></h4>
                <label className="data-form">
                  <DatePicker
                    selected={this.state.data.end_collection_orders_date}
                    onChange={this.handleDatePickerEndCollectionDate}
                    dateForm="MM/DD/YYYY"
                    name={`${this.name}.start_date`}
                    disabled={!!(this.state.data.id && !this.state.activeDatePicker)}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    placeholderText="Выберите дату"
                  />
                </label>
              </div>
            </div>
            <div className="column">
              {
                (this.state.data.id && !this.state.activeDatePicker)
                  ? (<div className="admin-card__controls admin-card__controls_periods">
                    <button
                      className='button edit__btn'
                      type="button"
                      onClick={this.editPeriod}
                      title='Редактировать'/>
                    <button
                      className="button remove__btn"
                      type="button"
                      title="Удалить дату"
                      hidden={!!(this.state.data.general)}
                      onClick={() => this.handleToggleModal()}/>
                  </div>)
                  : (<div className="event-period__submit-btn">
                    <button type="submit" onClick={this.onFormSubmit} className="button button_big">Сохранить</button>
                  </div>)
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="price-percent">
            Процент наценки от базовой цены
            <div className="text-form">
              <input name={`${this.name}.name`}
                     placeholder="Введите значение в процентах"
                     value={this.state.data.price_percent}
                     onChange={this.handleChangePercent}
                     disabled={!!(this.state.data.id && !this.state.activeDatePicker)}
                     type="number"
              />
            </div>
            %
          </div>
        </div>
      </div>
    );
  }
}

export default Period;
