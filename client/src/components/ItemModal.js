import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    };
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem({
            name: this.state.name
        });
        this.toggle();
    };

    btnAddItems = {
        color: "dark",
        style: {
            marginBottom: '1rem',
            marginLeft: '1rem'
        }
    };
    inProps = {
        type: "text",
        name: "name",
        id: "item",
        placeholder: "Add shopping item"
    };
    btnSubmit = {
        color: "dark",
        style: {
            marginTop: '1rem'
        },
    };
    render() {
        return (
            <div>
                <Button {...this.btnAddItems} onClick={this.toggle}>Add Item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} >
                        Add to Shopping List
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input {...this.inProps} onChange={this.onChange}>
                                    </Input>
                                    <Button {...this.btnSubmit} block>Submit</Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </ModalHeader>
                </Modal>
            </div>
        )
    };

}




const mapStateToProps = state => ({
    item: state.item
})
export default connect(mapStateToProps, { addItem })(ItemModal)
