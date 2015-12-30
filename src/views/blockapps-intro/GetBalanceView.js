import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/theme/github'

export class GetBalanceView extends React.Component {
    static defaultProps = {
      code: `
<html>
  <head>
    <script type="text/javascript" src="libs/blockapps-min.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //This example showcases simple address fetching
      var blockapps = require('blockapps-js');
      var Account = blockapps.ethbase.Account;

      var address = "0x16ae8aaf39a18a3035c7bf71f14c507eda83d3e3"

      Account(address).balance.then(function (balance) {
        $("balance").innerHTML = balance.toString();
      });
    </script>
  </head>
  <body>
    Balance:
    <span id="balance"></span>
  </body>
</html>`
    }

    static propTypes = {
      step: React.PropTypes.number.isRequired,
      code: React.PropTypes.string
    }
    onChange (newValue) {
      console.log('changed', newValue)
    }
    render () {
      return (
          <div>
            <AceEditor
                mode='html'
                theme='github'
                onChange={this.onChange}
                name='editor'
                value={this.props.code}
            >Hello</AceEditor>
          </div>
      )
    }
}

export default GetBalanceView
