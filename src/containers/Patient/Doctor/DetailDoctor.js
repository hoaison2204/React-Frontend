import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../homePage/HomeHeader'
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService'
import DoctorSchedule from './DoctorSchedule'
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        console.log('check state: ', this.state);
        let { detailDoctor } = this.state;
        let name = '';
        if (detailDoctor && detailDoctor.positionData) {
            name = `${detailDoctor.positionData.valueEn} - ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="doctor-detail-container">
                    {/* intro */}
                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className="content-right">
                            <div className="up">
                                {name}
                            </div>
                            <div className="down">
                                {
                                    detailDoctor
                                    && detailDoctor.Markdown
                                    && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    {/* booking */}
                    <div className="schedule-doctor-booking-time">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                        </div>
                        <div className="content-right"></div>

                    </div>
                    {/* detail */}
                    <div className="detail-info-doctor">
                        <div className="schedule-doctor">
                            {
                                detailDoctor
                                && detailDoctor.Markdown
                                && detailDoctor.Markdown.contentHTML
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* content */}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
