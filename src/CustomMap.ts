export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  public map: google.maps.Map;

  constructor() {
    this.initMap();
  }

  async initMap(): Promise<void> {
    try {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;

      this.map = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
        mapId: 'map',
      });
    } catch (err) {
      console.error(err);
    }
  }

  async addMarker(mappable: Mappable): Promise<void> {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map: this.map,
      });
    });
  }
}
