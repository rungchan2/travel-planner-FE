// 타입저장소

export interface ITrip {
    tripId: string;
    userId: string;
    tripPlace: string;
    startDate: string;
    endDate: string;
    imagePath: string;
    isVisited: boolean;
}

export interface IUser {
    userId: string;
    userName: string;
    userEmail: string;
}


export interface IDestination {
    destinationId: string;
    destinationTypeId: string;
    count: number;
    address: string;
    addressDetail: string;
    longitude: number;
    latitude: number;
}

export interface IDestinationType {
    destinationTypeId: string;
    destinationTypeName: string;
    count: number;
}

export interface ITravelPlan {
    title: string;
    location: string;
    startDate: Date;
    endDate: Date;
}

// export interface ITripDestination {
//     tripDestinationId: string;
//     dateId: string;
//     description: string;
// }

// export interface ITripDate {
//     dateId: string;
//     date: string;
// }