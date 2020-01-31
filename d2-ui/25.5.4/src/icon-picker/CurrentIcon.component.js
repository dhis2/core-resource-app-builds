import React from 'react';
import IconOption from './IconOption.component';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Translate from '../i18n/Translate.component';

export default function CurrentIcon(props) {
    if (!props.imgSrc) {
        return (
            <FlatButton onClick={props.onIconClicked}>
                <Translate>select</Translate>
            </FlatButton>
        );
    }

    return (
        <IconOption {...props} />
    );
}
