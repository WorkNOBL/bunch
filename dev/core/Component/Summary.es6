import React from 'react'
import CSSModules from 'react-css-modules'
import AltContainer from 'alt-container'

import Component from './Mixin/Component'
import Title from './Common/Title'
import Content from './Common/Content'
import List from './List/List'

import Style from '../Style/Summary'

import { default as Store } from '../Store/Event'
import { default as Action } from '../Action/Event'

@CSSModules(Style)
export default class Summary extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let { data } = this.props

        return (
            <div styleName="root">
                <Title>
                    <h2 styleName="title">View Feedback</h2>
                    <div styleName="text-container">
                        <span styleName="text">Here is the latest meeting feedback from your team, ranked by popularity.</span>
                        <span styleName="domain">domain = @{data.domain}</span>
                    </div>
                </Title>
                <Content>
                   <AltContainer stores={{ store: Store }}
                        actions={{ action: Action }}>
                        <List type="summary" />
                    </AltContainer>
                </Content>
            </div>
        )
    }
}
