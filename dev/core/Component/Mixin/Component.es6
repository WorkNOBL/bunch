import React from 'react'
import { extend } from 'lodash'

export default class Component extends React.Component {
    constructor(props){
        super(props)
    }

    transitionTo(pathname, state){
        let { history } = this.props

        history.transitionTo(extend(
            history.createLocation(), {
                pathname,
                state,
                action: 'PUSH'
            }
        ))
    }
}