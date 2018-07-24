/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button} from 'react-native';
import YouTube from 'react-native-youtube';
import { Provider, connect } from 'react-redux';

import { togglePlay, skipAhead, setCurrentTime } from './reducer';

type Props = {};
class GnarBox extends Component<Props> {

  //LIFECYCLE
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      duration: 0,
      currentTime: 0,
    }

  }

  //RENDER METHODS

  render() {
    return (
      <View style={styles.container}>
        <YouTube
          videoId="3NhHqPA8nIs"
          play={this.props.play}
          fullscreen={false}
          loop={true}
          controls={0}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          onProgress={(e)=>{
            console.log(e,'ONPROGRESS');
            const { duration, currentTime } = e;
            this.props.setCurrentTime(currentTime, duration);
          }}

          style={{ alignSelf: 'stretch', height: 300 }}
          ref="youtubePlayer"
        />
        <Button 
          title={this.props.play ? '⏸' : '▶️'}
          onPress={this.props.togglePlay}
        />
        <Button 
          title="skip 20 seconds"
          onPress={()=> {
            this.refs.youtubePlayer.seekTo(this.props.currentTime + 20);
            this.props.skipAhead();
          }}
        />

        <Text>{this.props.currentTime}/{this.props.duration}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  }
});

const mapStateToProps = state => {
  let { play, duration, currentTime } = state;
  return {
    play,
    duration,
    currentTime
  };
};

const mapDispatchToProps = {
  togglePlay,
  skipAhead,
  setCurrentTime
};

export default connect(mapStateToProps, mapDispatchToProps)(GnarBox);
