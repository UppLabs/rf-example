import React, { Component } from 'react';
import './Infographic.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Picker from 'react-month-picker'
import Checkbox from '../../../common/checkbox/checkbox.jsx';
import Input from '../../../common/input/input.jsx';
import Loader from '../../../common/loader.jsx';
import InfographicPreview from './components/InfographicPreview.jsx';
import * as enums from './enums';

import html2canvas from 'html2canvas';
import htmlToImage from 'html-to-image';

import {callPost} from  '../../../common/services/fetchService.jsx';
import { withRouter } from 'react-router-dom'
import {MonthBox} from './components/MonthBox.jsx';
import '../../../css/month-picker.css';
import {clientUrl} from './../../../common/variables.jsx';

export class Infographic extends Component {
  constructor(props) {
    super(props);
    var {city, firstName, lastName, pictureUrl} = props.user || {};
    var userName = firstName && lastName ? `${firstName} ${lastName}` : undefined; 
    
    if (props.user) { 
      props.user.userName = userName;
    }
    var nextMonthMoment = moment().add('months', 2);
    this.state = {
      apparmentsType: enums.AppartmentTypeList,
      moveInAsap: true,
      leasingRange: {from: {year: nextMonthMoment.year(), month: nextMonthMoment.month()},
        to: {year: nextMonthMoment.clone().add('years', 1).year(), month: nextMonthMoment.month()}
      },
      startDate: moment(),
      startDateMax: moment().add('days',7),
      userName: userName,
      isEditableUserName: true,
      price: null,
      location: "",
      city: city || "New York",
      comment: "To help me find a flat like and share my post.",
      needs: enums.NeedsList,
      pets: enums.PetsList,
      isPaperWorkReady: false,
      isTempWallInNeed: false,
      loading: false,
      user: props.user || {},
    };

    this.handleRangeDismiss = this.handleRangeDismiss.bind(this);
    this.handleDateMaxChange = this.handleDateMaxChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.handlePetsChange = this.handlePetsChange.bind(this);
    this.renderPetsList = this.renderPetsList.bind(this);
    this.handleListItemChange = this.handleListItemChange.bind(this);
    this.save = this.save.bind(this);
    
    this.handleClickRangeBox = this.handleClickRangeBox.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  save(){
    this.setState(prevState => {
      return {
        ...prevState,
        loading: true,
      }
    });

    const {moveInAsap, city, price, leasingRange, startDate, startDateMax, location, comment, apparmentsType} = this.state;
    const dateFrom = moment([leasingRange.from.year, leasingRange.from.month - 1]);
    const dateTo = moment([leasingRange.to.year, leasingRange.to.month - 1]).endOf('month');
    var flatType = apparmentsType.filter(function(i){
      return i.isChecked;
    });

    const model = {price, startDate, startDateMax, location, comment,
       flatType, city,
       dateOther: moveInAsap ? 'Move in ASAP' : null, 
      };
      
    if (!moveInAsap) {
      model.dateFrom = dateFrom;
      model.dateTo = dateTo;
    }

    const details = {
      needs: this.state.needs,
      pets: this.state.pets,
      isPaperWorkReady: this.state.isPaperWorkReady,
      isTempWallInNeed: this.state.isTempWallInNeed,
    };
    model.details = details;
    
  try {
    var node = document.getElementById('InfographicPreviewId');
    htmlToImage.toPng(node)
    .then(function (dataUrl) {
      // var img = new Image();
      // img.src = dataUrl;
      // document.body.appendChild(img);
    model.image = dataUrl;
      callPost("infographic", model).then(function(result){      });    
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

    // html2canvas(document.querySelector(".InfographicPreview")).then(function(canvas) {
    //   var img = canvas.toDataURL("image/png");
    //   //Canvas2Image.saveAsPNG(canvas); 
    //   model.image = img;
    //   // var postModel = JSON.stringify(model);
    //   callPost("infographic", model).then(function(result){
    //   });
    //   //document.body.appendChild(canvas);
    // });
  } catch(exception) {
    var postModel = JSON.stringify(model);
    callPost("infographic", postModel);
  }
    
  }

  updateState () {
    this.setState(prevState => {
      return {
        ...prevState,
        loading: false,
      }
    });
  }

  handleRangeChange() {
  }

  handleRangeDismiss(range){
    this.setState(prevState => {
      return {
        ...prevState,
        leasingRange: range,
        moveInFrom: true,
        moveInAsap: false,
      }
    })
  }

  handleDateChange(dateValue) {
    var newStartDateMax = this.state.startDateMax;
    if (newStartDateMax.isBefore(dateValue)) {
      newStartDateMax = dateValue;
    }
    this.setState({
        startDate: dateValue,
        startDateMax: newStartDateMax
    });
  }
  
  handleDateMaxChange(dateValue) {
    this.setState({
      startDateMax: dateValue,
    });
  }

  handleClickRangeBox(e) {
    this.setState(prevState => {
      return {
        ...prevState,
        moveInFrom: true,
        moveInAsap: false,
      }
    }, () => {
      this.refs.pickRange.show();
    });
}

  handleListItemChange(listName, isChecked, item){
    var list = this.state[listName];
    var item = list.filter(function(e){
      return e.id == item.id;
    });

    if (item.length) {
      item[0].isChecked = isChecked;
    }

    this.setState({
      [listName]: list,
    });
  }

  handlePetsChange(isChecked, item){
    var pets = this.state.pets;
    var petItem = pets.filter(function(e){
      return e.id == item.id;
    });

    if (petItem.length) {
      petItem[0].isChecked = isChecked;

      if (petItem[0].id == -1) {
        pets.forEach(function(e){
          return e.id != -1 && (e.isChecked = false);
        });
      } else {
        var noPetItem = pets.filter(function(e){
          return e.id == -1;
        });
        noPetItem[0].isChecked = false;
      }
    }

    this.setState({
      pets,
    });
  }

  changeInput(value, field) {
    this.setState({
      [field]: value,
    });
  }

  changeCheckbox(value, field) {
    if (field == 'moveInFrom' && value) {
      this.setState({
        [field]: value,
        moveInAsap: false,
      });
    }
    else if(field == 'moveInAsap' && value) {
      this.setState({
        [field]: value,
        moveInFrom: false,
      });  
    }
    else {
    this.setState({
      [field]: value,
    });
  }
  }

  
  renderList(name) {
    var _handleItemChange = this.handleListItemChange;
    return this.state[name].map(function(e) { 
      return e.isHidden ? null : (<Checkbox  key={`${name}-${e.id}`} label={e.label} isChecked={e.isChecked}  item={e} 
        onChange={(isChecked, item) => _handleItemChange(name, isChecked, item)}/>);
    });
  }

  renderPetsList() {
    var _handlePetsChange = this.handlePetsChange;
    return this.state.pets.map(function(e) { 
      return (<Checkbox  key={"pet-" + e.id} label={e.label} isChecked={e.isChecked}  item={e} onChange={_handlePetsChange}/>);
    });
  }

  render() {
    var minYear = moment().year(),
      maxYear = moment().add('years', 20).year(),
      nextMonthMoment = moment().add('months', 2);

    var pickerLang = {
        months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        from: 'From', 
        to: 'To'
      }, 
      mvalue = {year: minYear, month: moment().month()};

    var makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
        return '?'
      }


    return (
      <div className="row Infographic">
        <div className="col-md-6 Infographic-editor">
          {this.state.isEditableUserName ? (<div className="Infographic-editor-field-container">
              <Input className="Infographic-editor-input" placeholder="Your name" 
              onChange={this.changeInput} field="userName" {...this.state} onChange={this.changeInput}/>
            </div>) : (null)}

          <div className="Infographic-appartment-type-container">
            <div>What are looking you for?</div>
            <div className="Infographic-appartment-type-container-items">
              {this.renderList('apparmentsType')}
            </div>
          </div>

          <div className="Infographic-editor-field-container">
            <Input className="Infographic-editor-input" placeholder="Your budget $/month" 
              onChange={this.changeInput} field="price" {...this.state} onChange={this.changeInput}/>
          </div>

          <div className="Infographic-editor-field-container">
            <div className="Infographic-editor-city-icon"></div>
            <Input className="Infographic-editor-input" placeholder="City" 
              field="city" {...this.state} onChange={this.changeInput}/>
          </div>


          <div className="Infographic-editor-field-container">
            <div className="Infographic-editor-location-icon"></div>
            <Input className="Infographic-editor-input" placeholder="Location" 
              field="location" {...this.state} onChange={this.changeInput}/>
          </div>
          
          <div className="Infographic-editor-field-container">
            <div className="Infographic-editor-comment-icon"></div>
            <Input className="Infographic-editor-textarea" placeholder="Your comment..." type="textarea"
              field="comment" {...this.state} onChange={this.changeInput}/>
          </div>

          <div className="Infographic-editor-field-container Infographic-editor-label">
            When do you want to move in:</div>

          <div className="Infographic-moveIn-container">
            <Checkbox label="As soon as possible" isChecked={this.state.moveInAsap} item="moveInAsap" onChange={this.changeCheckbox}/>

            <div className="Infographic-moveIn-period">
              <Checkbox label="Staying in for" isChecked={this.state.moveInFrom} item="moveInFrom" onChange={this.changeCheckbox}/>
              <Picker
                  ref="pickRange"
                  years={{min: minYear, max: maxYear}}
                  range={this.state.leasingRange}
                  lang={pickerLang}
                  theme="light"
                  onChange={this.handleRangeChange}
                  onDismiss={this.handleRangeDismiss}
                  >
                  
                  <MonthBox value={makeText(this.state.leasingRange.from) + ' ~ ' + makeText(this.state.leasingRange.to)} 
                  onClick={this.handleClickRangeBox} />
              </Picker>

            </div>
          </div>




{/* //  <span className="Infographic-editor-label-to">to</span>
//               <DatePicker
//                   className="form-control Infographic-editor-datepicker"
//                   selected={this.state.startDateMax}
//                   onChange={this.handleDateMaxChange}
//               />
          
        //  <div className="Infographic-editor-field-container Infographic-editor-label">
        //     Details:</div>

        //   <div className="Infographic-editor-field-container">
        //     <div className="col-md-6">
        //       <Checkbox label="Paperwork is ready" isChecked={this.state.isPaperWorkReady} item="isPaperWorkReady" onChange={this.changeCheckbox}/>
        //     </div>
        //     <div className="col-md-6">
        //       <div className="Infographic-editor-field-tempwall">
        //         <Checkbox label="I need a temp wall" isChecked={this.state.isTempWallInNeed} item="isTempWallInNeed" onChange={this.changeCheckbox}/>
        //       </div>
        //     </div>
        //   </div>  */}

          <div className="row">
      
          <div className="col-md-6">
            <div className="Infographic-editor-field-container Infographic-editor-label">
              Do you have any pets:</div>
              <div className="Infographic-editor-field-container">
                  <div className="checkbox-list">
                    {this.renderPetsList()}
                  </div>
                </div>
            </div>

            <div className="col-md-6">
              <div className="Infographic-editor-field-container Infographic-editor-label">
                Nice to have:</div>
                
                <div className="Infographic-editor-field-container">
                  <div className="checkbox-list">
                    {this.renderList("needs")}
                  </div>
                </div>
            </div>
   
          </div>
        
        <div className="Infographic-editor-buttons">
          <button className="button-blue" onClick={this.save}>
            <div className="Button-label">SHARE</div>
          </button>
        </div>
        </div>

        <div className="col-md-6">
          <div className="Infographic-Preview">
            <InfographicPreview {...this.state}/>
          </div>
        </div>
        
        {this.state.loading ? ( <Loader/>): (<span/>)}
      </div>
    );
  }
}

export default withRouter(Infographic);
