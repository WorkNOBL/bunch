import React from 'react'
import CSSModules from 'react-css-modules'
import AltContainer from 'alt-container'
import { ScaleModal as Modal } from 'boron'
import Prefixer from 'react-prefixer'

import Component from './Mixin/Component'
import Title from './Common/Title'
import Content from './Common/Content'

import List from './List/List'
import Survey from './Survey'

import Style from '../Style/Rating'
import EventEmitter from '../Vendor/EventEmitter'

import { default as Store } from '../Store/Event'
import { default as Action } from '../Action/Event'

@CSSModules(Style)
export default class Rating extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: null
        }

        this.listener = {
            showModal: this.showModal.bind(this),
            hideModal: this.hideModal.bind(this)
        }
    }

    componentDidMount(){
        EventEmitter.on('showModal', this.listener.showModal)
        EventEmitter.on('hideModal', this.listener.hideModal)
    }

    componentWillUnmount(){
        EventEmitter.removeListener('showModal', this.listener.showModal)
        EventEmitter.removeListener('hideModal', this.listener.hideModal)
    }

    showModal(data){
        this.setState({
            data
        })

        this.refs.modal.show()
    }

    hideModal(){
        this.refs.modal.hide()
    }

    render(){
        let { data } = this.props

        return (
            <div styleName="root">
                <Title>
                    <h2 styleName="title">Rate Your Meetings</h2>
                    <div styleName="text-container">
                        <span styleName="text">How satisfied are you with your recurring meetings?</span>
                        <span styleName="domain">domain = @{data.domain}</span>
                    </div>
                </Title>
                <Content>
                    <AltContainer stores={{ store: Store }}
                        actions={{ action: Action }}>
                        <List type="rating" />
                    </AltContainer>
                </Content>
                <Modal ref="modal" className="modal" modalStyle={Prefixer({
                    width: '80%',
                    height: '100%',
                    right: 0,
                    left: 'auto',
                    transform: 'translate3d(0, 0, 0)',
                    top: 0
                })}>
                    <a styleName="close"
                        onClick={this.hideModal.bind(this)}>close</a>
                    <AltContainer stores={{ store: Store }}>
                        <Survey data={this.state.data} />
                    </AltContainer>
                </Modal>
            </div>
        )
    }
}
