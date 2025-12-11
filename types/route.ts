export type Route = {
  routeLabels: (
    | "ROUTE_LABEL_UNSPECIFIED"
    | "DEFAULT_ROUTE"
    | "DEFAULT_ROUTE_ALTERNATE"
    | "FUEL_EFFICIENT"
    | "SHORTER_DISTANCE"
  )[];
  legs: {
    distanceMeters: number;
    duration: string;
    staticDuration: string;
    polyline: {
      encodedPolyline: string;
    };
    startLocation: {
      latLng: {
        latitude: number;
        longitude: number;
      };
      heading: number;
    };
    endLocation: {
      latLng: {
        latitude: number;
        longitude: number;
      };
      heading: number;
    };
    steps: {
      distanceMeters: number;
      staticDuration: string;
      polyline: {
        encodedPolyline: string;
      };
      startLocation: {
        latLng: {
          latitude: number;
          longitude: number;
        };
        heading: number;
      };
      endLocation: {
        latLng: {
          latitude: number;
          longitude: number;
        };
        heading: number;
      };
      navigationInstruction: {
        maneuver?: string;
        instructions?: string;
      };
      localizedValues: {
        distance: {
          text: string;
        };
        duration: {
          text: string;
        };
        transitFare: {
          text: string;
        };
      };
      travelMode: "WALK" | "TRANSIT";
      transitDetails?: {
        stopDetails: {
          arrivalStop: {
            name: string;
            location: {
              latitude: number;
              longitude: number;
            };
          };
          arrivalTime: string;
          departureStop: {
            name: string;
            location: {
              latitude: number;
              longitude: number;
            };
          };
          departureTime: string;
        };
        localizedValues: {
          arrivalTime: {
            time: {
              text: string;
            };
            timeZone: string;
          };
          departureTime: {
            time: {
              text: string;
            };
            timeZone: string;
          };
        };
        headsign: string;
        headway: string;
        transitLine: {
          agencies: {
            name: string;
            uri: string;
          }[];
          name: string;
          color: string;
          nameShort: string;
          textColor: string;
          vehicle: {
            name: {
              text: string;
            };
            type: string;
            iconUri: string;
          };
        };
        stopCount: number;
      };
    }[];
    stepsOverview: {
      multiModalSegments: {
        stepStartIndex: number;
        stepEndIndex: number;
        travelMode: string;
        navigationInstruction: {
          instructions: string;
        };
      }[];
    };
  }[];
  distanceMeters: string;
  staticDuration: string;
  polyline: { encodedPolyline: string };
  viewport: {
    low: {
      latitude: number;
      longitude: number;
    };
    high: {
      latitude: number;
      longitude: number;
    };
  };
  travelAdvisory: {
    transitFare: {
      units: string;
    };
  };
  localizedValues: {
    distance: {
      text: string;
    };
    duration: {
      text: string;
    };
    transitFare: {
      text: string;
    };
  };
};
