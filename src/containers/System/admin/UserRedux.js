import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRedux.scss';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser.js'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            // isUserCreated: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        this.props.fetchUserRedux();
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //gender
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        //position
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        //role
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''

            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    openImagePreview = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;


        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        });
        // setTimeout(() => {
        //     this.props.fetchUserRedux();
        // }, 1000)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Please enter a valid parameters in field: ' + arrCheck[i]);
                break;
            }
        }
        return { isValid }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    render() {
        let genders = this.state.genderArr;
        let roleIds = this.state.roleArr;
        let positions = this.state.positionArr;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>
                <div className="user-redux-body">
                    <div lassName="container">
                        <div className="row">
                            <div className="col-12 my-3">Add new user</div>
                            <div className="col-3">
                                <label>First name</label>
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>

                            <div className="col-3">
                                <label>Last name</label>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>

                            <div className="col-3">
                                <label>Email</label>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>

                            <div className="col-3">
                                <label>Password</label>
                                <input className="form-control" type="Password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }} />
                            </div>

                            <div className="col-3">
                                <label>Phone number</label>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>

                            <div className="col-9">
                                <label>Address</label>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>

                            <div className="col-3">
                                <label>Gender</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >

                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>Role ID</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roleIds && roleIds.length > 0 && roleIds.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>Position</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>Image</label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label className="label-upload" htmlFor="previewImg">Upload <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openImagePreview()}>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <button className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}>Save</button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser />
                            </div>
                        </div>
                    </div>

                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
