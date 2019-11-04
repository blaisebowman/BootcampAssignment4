import React from 'react';

class AddBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            name: '',
            address: '',
            coordinates: {
                latitude: '',
                longitude: ''
            },
            error: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.closeButtonRef = React.createRef();
    }
    handleToggleClick(){
        this.setState(prevState => ({showErr: !prevState.showErr}));
    }
    handleSubmit(event) {
        event.preventDefault();
        const code = this.state.code.toUpperCase();
        const name = this.state.name.toLowerCase();
        const {address, coordinates, latitude, longitude} = this.state;
        const exists = this.props.buildings.find(building => {
            return (building.code === code || building.name.toLowerCase() === name);
        });
        if (!exists) {
            console.log(latitude);
            console.log(longitude);
            this.props.addBuilding(code, name, address, {latitude, longitude});
            this.closeButtonRef.current.click();
            console.log(coordinates);
            this.setState({error: false});
            event.target.reset();
        } else {
            this.setState({error: true});
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (this.state.error == true){
            this.setState({error: false});
        }
    }

    render() {
        return (
            <div
                className="modal fade"
                id="addBuildingModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addBuildingModalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-body">
                            {this.state.error && !this.state.showErr &&
                            <button
                                className="alert alert-danger"
                                role="alert"
                                onClick={this.handleToggleClick}
                            >
                                <b>Error: a building with this code or name already exists!</b>
                            </button>
                            }
                            <form onSubmit={this.handleSubmit}
                            autocomplete="off">
                                <div className="form-group">
                                    <label
                                        htmlFor="building-code"
                                        className="col-form-label required-field"
                                    >
                                        Code:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="building-code"
                                        name="code"
                                        onChange={this.handleChange}
                                        required
                                        pattern="[a-zA-Z]{3}|[a-zA-Z]{4}"
                                    />
                                    <small
                                        id="codeHelpBlock"
                                        className="form-text text-muted"
                                    >
                                        Codes are 3-4 characters.
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="building-name"
                                        className="col-form-label required-field"
                                    >
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="building-name"
                                        name="name"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="building-address"
                                        className="col-form-label"
                                    >
                                        Address:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="building-address"
                                        name="address"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="row-coordinates">
                                    <div className="column-coordinates">
                                        <div className="form-group">
                                            <label
                                                htmlFor="building-latitude"
                                                className="col-form-label"
                                            >
                                                Latitude:
                                            </label>
                                            <input
                                                className="form-control"
                                                id="building-coordinates"
                                                name="latitude"
                                                onChange={this.handleChange}
                                                type="number"
                                                step="0.0000001"
                                                min="-90.0000000"
                                                max="90.00000000"
                                            />
                                        </div>
                                    </div>
                                    <div className="column-coordinates-long">
                                        <div className="form-group">
                                            <label
                                                htmlFor="building-longitude"
                                                className="col-form-label"
                                            >
                                                Longitude:
                                            </label>
                                            <input
                                                className="form-control"
                                                id="building-longitude"
                                                name="longitude"
                                                onChange={this.handleChange}
                                                type="number"
                                                step="0.0000001"
                                                min="-90.0000000"
                                                max="90.00000000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row justify-content-end">
                                        <button
                                            type="submit"
                                            className="btn btn-add"
                                            ref={this.closeButtonRef}
                                        >
                                            <b>Click to add Building to List</b>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBuilding;
