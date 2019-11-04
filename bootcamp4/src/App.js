import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from './components/AddBuilding';
import RemoveBuilding from './components/RemoveBuilding';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selectedBuilding: 0,
      buildings: this.props.data,
        showAdd: false,
        showRemove: false
    }
    ;
    this.filterUpdate = this.filterUpdate.bind(this);
    this.selectedUpdate = this.selectedUpdate.bind(this);
    this.addBuilding = this.addBuilding.bind(this);
    this.removeBuilding = this.removeBuilding.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleToggleClick2 = this.handleToggleClick2.bind(this);
  }
    handleToggleClick(){
        this.setState(prevState => ({showAdd: !prevState.showAdd}));
    }
    handleToggleClick2(){
        this.setState(prevState => ({showRemove: !prevState.showRemove}));
    }

    filterUpdate(value) {
    //Here you will need to set the filterText property of state to the value passed into this function
    this.setState({filterText: value});
  }

  selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    this.setState({
      selectedBuilding: id
    })
  }
  addBuilding(code,name,address,coordinates){
    const buildingAdded = this.state.buildings.concat({
      code: code,
      name: name,
      address: address,
      coordinates: coordinates
    });

    buildingAdded.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    }).forEach((building, i) => {
      building.id = i + 1;
    });
    this.setState({ buildings: buildingAdded });
  }

  removeBuilding(code) {
    const index = this.state.buildings.findIndex(building => {
      return building.code === code;
    });

    if (this.state.selectedBuilding === index + 1) {
      this.setState({ selectedBuilding: 0 });
    }

    const newList = [
      ...this.state.buildings.slice(0, index),
      ...this.state.buildings.slice(index + 1)
    ];

    newList.forEach((building, i) => {
      building.id = i + 1;
    });

    this.setState({ buildings: newList });
  }
state = {showing: true};
  render() {
    return (
      <div className="bg">
        <div className="row">
          <h1>UF Directory App</h1>
        </div>
        <Search
          filterText = {this.state.filterText}
          filterUpdate = {this.filterUpdate}
        />
        <main>
          <Container>
            <div className = "row">
              <Row>
              <div className = "column1">

                  <Button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#addBuildingModal"
                      onClick={this.handleToggleClick}
                  >
                    <b>Add a Building</b>
                  </Button>
                  {this.state.showAdd ? <AddBuilding
                      add = {this.state.showAdd}
                      onClick = {() => this.setState({showing: false})}
                      buildings={this.state.buildings}
                      addBuilding={this.addBuilding}
                  /> : ''}
              </div>
              <div className = "column1">
                <Button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#addBuildingModal"
                    onClick={this.handleToggleClick2}
                    >
                  <b>Remove a Building</b>
                </Button>
                  {this.state.showRemove ? <RemoveBuilding
                      remove = {this.state.showRemove}
                      onClick = {() => this.setState({showing: false})}
                      buildings={this.state.buildings}
                      removeBuilding={this.removeBuilding}
                  /> : ''}

              </div>

              </Row>
            </div>
          </Container>

          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                  <thead>
                  <tr className = "titles">
                    <th>Code</th>
                    <th>Building</th>
                  </tr>
                  </thead>
                  <BuildingList
                    buildings={this.state.buildings}
                    filterText = {this.state.filterText}
                    selectedUpdate={this.selectedUpdate}
                  />
                </table>
              </div>
            </div>
            <div className="column2">
              <ViewBuilding
              selectedBuilding = {this.state.selectedBuilding}
              buildings = {this.state.buildings}
              />
            </div>
          </div>
          <Credit/>
        </main>
      </div>
    );
  }
}

export default App;
