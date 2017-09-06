import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './Components/searchBar';
import YouTubeSearch from 'youtube-api-search';
import VideoList from './Components/videoList';
import VideoDetail from './Components/videoDetail';
const API_Key = 'AIzaSyDBGUrQzsG7JkjlTolhDcYfur8DgngaoQg';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        }

        YouTubeSearch({key: API_Key, term: 'destiny 2'}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));