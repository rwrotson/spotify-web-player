export type errorType = (
    "noConnection" | 
    "notPlaying" | 
    "authorizationError" | 
    "playerError"
)


export const PlayerError = class extends Error{

    constructor(message: string, name: errorType = "playerError") {
        super(message)
        this.name = name
    }
}


export const AuthorizationError = class extends PlayerError{
    constructor(message: string) {
        super(message)
        this.name = "authorizationError"
    }
}


export const ConnectionError = class extends PlayerError{
    constructor(message: string) {
        super(message)
        this.name = "noConnection"
    }
}


export const NotPlayingError = class extends PlayerError{
    constructor(message: string) {
        super(message)
        this.name = "notPlaying"
    }
}