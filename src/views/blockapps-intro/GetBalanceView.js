import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import BaseView from './BaseView'
import JSValidator from '../../components/JSValidator'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class GetBalanceView extends BaseView {
    static defaultProps = {
      step: 2,
      validationCode: function () {
        Account(_).balance.then(function (_) { // eslint-disable-line no-undef
          _
        }); // eslint-disable-line semi
      },
      codeBlock: `Account(address).balance.then(function (balance) {
  $('balance').innerHTML = balance.toString();
});`,
      editableArea: [[12, 0, 13, 0]],
      template: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps-min.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //This example showcases simple address fetching
      var blockapps = require('blockapps-js');
      var Account = blockapps.ethbase.Account;

      var address = '0x16ae8aaf39a18a3035c7bf71f14c507eda83d3e3'

      function updateBalance() {
        [ADD balance() HERE]
      }

    </script>
  </head>
  <body onload="updateBalance()">
    Balance:
    <span id="balance"></span>
  </body>
</html>`
    }

    constructor (props) {
      super(props)
    }

    handleProceed () {
      let userInput = this.extractText()
      let validationResult = JSValidator.validate(userInput[0], this.props.validationCode)
      if (validationResult) {
        this.proceedToNextStep()
      }
    }

    render () {
      return (
        <div>
          <div className='row'>
            <div className='col-md-12'>Account() object allows you to interact with an Ethereum account.</div>
            <div className='col-md-12'>Account(address) returns a promise.</div>
          </div>
          <div className='row'>
              <div className='col-md-8'>
                <Hightlight className='javascript'>{this.props.codeBlock}</Hightlight>
              </div>
              <div className='col-md-4'>
                <button className='btn btn-success' onClick={this.handleProceed}>I retrieved the balance</button>
              </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
                <AceEditor
                    mode='html'
                    theme='github'
                    onChange={this.onEditorChange}
                    onLoad={this.onEditorLoad}
                    highlightActiveLine={false}
                    width='85%'
                    height='30em'
                    name='tutorialEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default GetBalanceView
