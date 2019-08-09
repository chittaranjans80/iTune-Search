import { Component, OnInit, HostListener } from '@angular/core';
import { ITunesService } from '../../services/i-tunes.service';
import { iTuneFileType } from '../../model/iTune-file-type.enum';
import { ITuneResponse } from '../../model/iTune-response.model';
import { iTuneFilterResult } from '../../model/iTune-filter-result.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  searchString: string;
  searchResult: iTuneFilterResult[];

  constructor(
    private iTuneService: ITunesService
  ) {
  }

  //Save data in localstorage before page refresh
  @HostListener('window:beforeunload')
  saveDataInLocalStorage() {
    if (this.searchString) {
      localStorage.setItem('searchString', this.searchString);
    }
    if (this.searchResult && this.searchResult.length > 0) {
      localStorage.setItem('searchResult', JSON.stringify(this.searchResult));
    }
  }

  ngOnInit() {
    const searchString = localStorage.getItem('searchString');
    this.searchString = searchString ? searchString : '';
    const searchResult = localStorage.getItem('searchResult');
    this.searchResult = searchResult ? JSON.parse(searchResult) : [];
  }

  searchTrack(searchStr: string): void {
    if (searchStr && searchStr !== this.searchString) {
      this.searchString = searchStr;
      const searchTerm = searchStr.split(' ').join('+');
      this.iTuneService.searchTrack(searchTerm).subscribe((response: any) => {
        this.updateSearchResults(response);
      });
    }
  }

  private updateSearchResults(results: ITuneResponse[]) {
    this.searchResult = [
      {
        'name': 'Movies',
        'items': results.filter(item => item.kind === iTuneFileType.movie)
      },
      {
        'name': 'Songs',
        'items': results.filter(item => item.kind === iTuneFileType.song)
      },
      {
        'name': 'Books',
        'items': results.filter(item => item.kind === iTuneFileType.book)
      },
      {
        'name': 'Albums',
        'items': results.filter(item => item.kind === iTuneFileType.album)
      },
      {
        'name': 'Audios',
        'items': results.filter(item => item.kind === iTuneFileType.audio)
      },
      {
        'name': 'Booklets',
        'items': results.filter(item => item.kind === iTuneFileType.booklet)
      },
      {
        'name': 'Videos',
        'items': results.filter(item => item.kind === iTuneFileType.video)
      },
      {
        'name': 'Pdfs',
        'items': results.filter(item => item.kind === iTuneFileType.pdf)
      },
      {
        'name': 'Podcasts',
        'items': results.filter(item => item.kind === iTuneFileType.podcast)
      },
      {
        'name': 'Softwares',
        'items': results.filter(item => item.kind === iTuneFileType.software)
      },
      {
        'name': 'Episodes',
        'items': results.filter(item => item.kind === iTuneFileType.episode)
      }
    ];
  }

}
