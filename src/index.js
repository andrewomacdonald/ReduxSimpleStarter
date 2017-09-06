import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
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
        };

        this.videoSearch('destiny 2');
    }


    videoSearch(searchTerm) {
        console.log('searchTerm ', searchTerm);
            YouTubeSearch({key: API_Key, term: searchTerm}, (videos) => {
                this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));