import {
    Button,
    Col,
    DIInject,
    INavigationService,
    InjectedNavigationServiceProps,
    InjectedThemeServiceProps,
    MultiBackHandler,
    Row,
    Screen
} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Assets from '../../assets/Assets';
import {SoundUtil} from '../../utils/SoundUtil';
import {FameListScreen} from '../fame-list/FameListScreen';

type WelcomeScreenProps =
    InjectedNavigationServiceProps &
    InjectedThemeServiceProps


type State = {
    currentAnimationIndex: number
}

@DIInject('$navigation', '$theme')
@observer
export class WelcomeScreen extends React.Component<WelcomeScreenProps, State> {
    static readonly ROUTE_NAME = 'WelcomeScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    state = {
        currentAnimationIndex: 0
    };

    animations = [
        Assets.images.gif_1,
        Assets.images.gif_2,
        Assets.images.gif_3,
        Assets.images.gif_4,
        Assets.images.gif_5,
    ];
    protected animationChangerIntervalId;

    componentDidMount() {
        this.animationChangerIntervalId = setInterval(this.showNextAnimation, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.animationChangerIntervalId);
    }

    @autobind
    showNextAnimation() {
        this.setState({
            currentAnimationIndex: (this.state.currentAnimationIndex + 1) % this.animations.length
        })
    }

    render() {
        return (
            <WelcomeComponent
                onBackPress={this.handleBackPress}
                onRandomisePress={this.handleRandomisePress}
                oSavePress={this.handleSavePress}
                animation={this.animations[this.state.currentAnimationIndex]}
                $theme={this.props.$theme}
            />
        )
    }

    @autobind
    handleSavePress() {

    }

    @autobind
    handleRandomisePress() {

    }

    @autobind
    handleBackPress(count: number) {
        if (count === 1) {
            FameListScreen.start(this.props.$navigation)
        } else if (count === 2) {
            SoundUtil.play(Assets.sounds.test)
                .then(success => {
                    BackHandler.exitApp();
                })
        }
    }
}

type WelcomeComponentProps =
    InjectedThemeServiceProps &
    {
    oSavePress: () => void
    onRandomisePress: () => void
    onBackPress: (count: number) => void | boolean,
    animation: ImageSourcePropType,
}

function WelcomeComponent(props: WelcomeComponentProps) {
    // let styles = makeStyle(props.$theme);
    return (
        <Screen style={styles.container}>
            <Image
                style={{flex: 1, width: '90%'}}
                resizeMode={'contain'}
                source={props.animation}
            />
            <Col style={{
                paddingHorizontal: props.$theme.dimens.screen.paddingHorizontal,
                paddingVertical: props.$theme.dimens.screen.paddingVertical,
                backgroundColor: '#fff'
            }}>
                <TextField
                    label={'Enter a number'}
                    style={styles.textInput}
                    keyboardType={'numeric'}
                />

                <Row>
                    <Button
                        style={{flex: 1}}
                        title={'Save'}
                        onPress={props.oSavePress}
                        filled
                        accent
                    />
                    <View style={{width: 16}}/>
                    <Button
                        style={{flex: 1}}
                        title={'Randomise'}
                        onPress={props.onRandomisePress}
                        accent
                        outlined
                    />
                </Row>
            </Col>
            <MultiBackHandler
                timeout={500}
                maxCount={2}
                onPress={props.onBackPress}/>
        </Screen>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    textInput: {}

});