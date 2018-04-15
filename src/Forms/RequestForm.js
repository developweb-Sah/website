import preact from 'preact';
import DynamicInputContainer from "./DynamicInputContainer";
import SignatureInput from "./SignatureInput";
import { Text } from 'preact-i18n';
import t from 'i18n';

export default class RequestForm extends preact.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="request-form">
                <fieldset>
                    <legend><Text id="request-parameters"/></legend>

                    <div className="request-type-chooser">
                        <Text id="request-type" /><br />
                        <input type="radio" id="request-type-choice-access" name="request-type" value="access" className="form-element" checked={this.props.request_data['type'] === 'access'}
                               onChange={this.handleChange} /> <label for="request-type-choice-access"><Text id="access-request"/></label>
                        <input type="radio" id="request-type-choice-erasure" name="request-type" value="erasure" className="form-element" checked={this.props.request_data['type'] === 'erasure'}
                               onChange={this.handleChange} /> <label for="request-type-choice-erasure"><Text id="erasure-request"/></label>
                        <input type="radio" id="request-type-choice-rectification" name="request-type" value="rectification" className="form-element" checked={this.props.request_data['type'] === 'rectification'}
                               onChange={this.handleChange} /> <label for="request-type-choice-rectification"><Text id="rectification-request"/></label>
                        <input type="radio" id="request-type-choice-custom" name="request-type" value="custom" className="form-element" checked={this.props.request_data['type'] === 'custom'}
                               onChange={this.handleChange} /> <label for="request-type-choice-custom"><Text id="own-request"/></label>
                    </div>

                    <div className="form-group fancy-fg recipient-form" style="margin-top: 17px;">
                        <Text id="recipient-explanation"/><br />
                        <textarea id="request-recipient" className="form-element" placeholder={t('recipient', 'generator')} rows="4" spellcheck="false" onChange={event => {
                            this.props.onChange({'recipient_address': event.target.value});
                        }}>{this.props.request_data['recipient_address']}</textarea>
                        <label className="sr-only" for="request-recipient"><Text id="recipient"/></label>
                        <input type="hidden" id="request-template" value="default" />
                    </div>
                </fieldset>

                <DynamicInputContainer onChange={this.props.onChange} fields={this.props.request_data['data']}/>

                <SignatureInput id="signature" width={400} height={200} onChange={this.props.onChange}/>
            </div>
        );
    }

    handleChange(event) {
        this.props.onChange({type: event.target.value});
    }

}
