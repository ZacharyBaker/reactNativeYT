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

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      duration: 0,
      currentTime: 0,
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <YouTube
          videoId="3NhHqPA8nIs"
          play={this.state.play}
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
            this.setState({
              duration,
              currentTime
            })
          }}

          style={{ alignSelf: 'stretch', height: 300 }}
          ref="youtubePlayer"
        />
        <Button 
          title={this.state.play ? '⏸' : '▶️'}
          onPress={()=> this.setState({play: !this.state.play})}
        />
        <Button 
          title="skip 20 seconds"
          onPress={()=> this.refs.youtubePlayer.seekTo(this.state.currentTime + 20)}
        />

        <Text>{this.state.currentTime}/{this.state.duration}</Text>
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
