import React, { Component } from 'react';
import './InfographicImage.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { UserLogo } from './UserLogo.jsx';
import moment from 'moment';

class InfographicImage extends Component {
    constructor(props) {
        super(props);

        this.getCheckedDetailsList = this.getCheckedDetailsList.bind(this);
        this.getCheckedPetsList = this.getCheckedPetsList.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    getCheckedDetailsList() {
        return this.props.needs.filter(function(e){
            return e.isChecked && !e.isHidden;
        });
    }

    getCheckedPetsList() {
        return this.props.pets.filter(function(e){
            return e.isChecked;
        });
    }

    renderList(items) {
        return items.map(function(e){ return e.isHidden ? null : (<li key={e.label + e.id}>{e.label}</li>);});
    }

    renderCommaSeparatedList(items) {
        var visibleItems = [];
        var result = items.map(function(e, index){ 
            if (e.isHidden || !e.isChecked) return null;
            visibleItems.push(e);
            if (visibleItems.length > 1) 
                return  (<span>, {e.label.toLowerCase()}</span>);
            
            return  (<span>{e.label.toLowerCase()}</span>);
        });

        return result.filter(function(e) { return e;}).length > 0 ? result : (<span>place</span>);
    }

    render() {
        const {userName, price} = this.props;
        const checkedDetailsList = this.getCheckedDetailsList();
        const checkedPetsList = this.getCheckedPetsList();
        const needElevator = this.props.needs && this.props.needs.filter(function(n){return n.id == 1 && n.isChecked;}).length > 0;
        const needLaudry = this.props.needs && this.props.needs.filter(function(n){return n.id == 2 && n.isChecked;}).length > 0;
        const needLight = this.props.needs && this.props.needs.filter(function(n){return n.id == 3 && n.isChecked;}).length > 0;
        const needView = this.props.needs && this.props.needs.filter(function(n){return n.id == 4 && n.isChecked;}).length > 0;
        const needGym = this.props.needs && this.props.needs.filter(function(n){return n.id == 5 && n.isChecked;}).length > 0;
        

        const petsDog = this.props.pets && this.props.pets.filter(function(n){return n.id == 1 && n.isChecked;}).length > 0;
        const petsCat = this.props.pets && this.props.pets.filter(function(n){return n.id == 2 && n.isChecked;}).length > 0;
        const petsSmallDog = this.props.pets && this.props.pets.filter(function(n){return n.id == 3 && n.isChecked;}).length > 0;
        
        
        const {leasingRange} = this.props;
        const dateFrom = moment([leasingRange.from.year, leasingRange.from.month - 1]).format('MMMM YYYY');
        const dateTo = moment([leasingRange.to.year, leasingRange.to.month - 1]).endOf('month').format('MMMM YYYY');


        return (
    <div className="InfographicImage-container">
        <div className="InfographicImage-details">
            <div className="InfographicImage-details-left">
                <div className="InfographicImage-userImage">
                    <UserLogo userImage={this.props.user.pictureUrl} userName={this.props.userName}/>
                </div>
                {this.props.startDateMax ? 
                    (<div className="InfographicImage-moveDate">
                        <div className="InfographicImage-month">{this.props.startDateMax.format("MMM")}</div>
                        <div className="InfographicImage-date">{this.props.startDateMax.date()}</div>
                    </div>)
                    :(<div>Want to move asap</div>)}
                {this.props.isPaperWorkReady ? (<div className="InfographicImage-icons-paperwork"></div>):(<span/>)}
                {this.props.isTempWallInNeed ? (<div className="InfographicImage-icons-wall"></div>):(<span/>)}
            </div>
            <div className="InfographicImage-details-right">
                <div className="InfographicImage-userInfo">
                    <div>Hi, my name is ...</div>
                    <div className="InfographicImage-userInfo-name">{this.props.userName}</div>
                    <div>I'm looking for a {this.renderCommaSeparatedList(this.props.apparmentsType)} 
                    {price ? <span> for</span> : null } </div>
                    {price ? <div className="InfographicImage-userInfo-price">{price} $ 
                        <span className="InfographicImage-userInfo-priceLabel">/month</span>
                      </div> : null
                    }
                    <div>
                        {this.props.moveInAsap ? <div>I want to move in as soon as possiple.</div> : 
                        <div>I want to stay in from {dateFrom} to {dateTo}</div>}
                    </div>
                </div>
                <div className="InfographicImage-description">
                    <div className="InfographicImage-details-location">
                    {this.props.location || this.props.city ? (<div>
                            <div className="InfographicImage-details-location-icon"></div>
                            <div className="InfographicImage-details-location-text">
                            <span>{this.props.city}</span>
                            <LinesEllipsis
                            text={this.props.location || ""}
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            />                 
                            </div>
                        </div>) : (<span/>)}
                    </div>

                  <div className="InfographicImage-details-comment">
                  {this.props.comment ? (
                      <div>
                        <div className="InfographicImage-details-comment-icon"></div>
                        <div className="InfographicImage-details-comment-text">
                        <LinesEllipsis
                            text={this.props.comment || ""}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            />
                        </div>
                      </div>) : (<span/>)}
                    </div>

                    <div className="InfographicImage-details-description">
                        {(checkedPetsList.length > 0) ?
                            (<div>
                                <div className="InfographicImage-details-title">I have:</div>
                                <ul className="InfographicImage-details-needs">
                                    {this.renderList(checkedPetsList)}
                                </ul>
                            </div>): (<span/>)
                        }

                        {(checkedDetailsList.length > 0) ?
                            (<div>
                                <div className="InfographicImage-details-title">Nice to have:</div>
                                <ul className="InfographicImage-details-needs">
                                    {this.renderList(checkedDetailsList)}
                                </ul>
                            </div>): (<span/>)
                        }
                    </div>
                </div>
            </div>
        </div>
       
        <div className="InfographicImage-iconsContainer">
            {(needLight && needView) 
              ?(<div className="InfographicImage-icons-view-and-light"></div>) 
              :(needView ? (<div className="InfographicImage-icons-view"></div>)
                :(needLight ? (<div className="InfographicImage-icons-light"></div>)
                  :(<div className="InfographicImage-icons-window"></div>))
              )}
            
            {needElevator ? (<div className="InfographicImage-icons-elevator"></div>):(<span/>)}
            {needLaudry ? (<div className="InfographicImage-icons-laundry"></div>):(<span/>)}
            {needGym ? (<div className="InfographicImage-icons-gym"></div>):(<span/>)}
            
            <div className="InfographicImage-icons-tv"></div>

            <div className="InfographicImage-icons-chair"></div>
            <div className="InfographicImage-icons-coffetable"></div>
            {petsCat ? (<div className="InfographicImage-icons-cat"></div>) : (<span/>)}
            {petsDog ? (<div className="InfographicImage-icons-dog"></div>) : (<span/>)}
            {petsSmallDog ? (<div className="InfographicImage-icons-smallDog"></div>) : (<span/>)}
            <div className="InfographicImage-floor"></div>
        </div>

        <div className='RentaFriend__Footer'>Created on www.rentalfriend.co</div>
    </div>
        );
    }
}

export default InfographicImage;