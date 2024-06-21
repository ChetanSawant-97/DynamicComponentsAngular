import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeDataService {

  constructor(private httpClient : HttpClient) { }
  private apiKey = "AIzaSyCvShtQ67TeUW_yRmSPXQUIJ3EWsFUQAyQ";
  private apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&order=viewCount&videoCategoryId=10&key=${this.apiKey}`;

  getYoutubeData=()=>{
    return this.httpClient.get<any>(this.apiUrl).pipe(
      map(response => {
        const items = response.items;
        const randomIndex = Math.floor(Math.random() * items.length);
        const item = items[randomIndex];
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle : item.snippet.channelTitle,
          views: item.statistics ? item.statistics.viewCount : 'N/A',
          uploadDate: item.snippet.publishedAt
        };
      })
    );
  }
}
