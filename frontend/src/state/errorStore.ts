import axios, { AxiosError } from "axios"
import { create } from "zustand"


interface IError {
    name: string,
    msg: string
}


type ErrorQueueStore = {
    errors: IError[]
    addError: (newError: AxiosError | Error) => void
    popError: () => IError | null
    clearErrors: () => void
}


function parseError(error: AxiosError | Error): IError {
    if (axios.isAxiosError(error) || error instanceof Error) {
        return {
            name: error.name,
            msg: error.message,
        }
    }

    throw new Error("Invalid type error")
}


const useErrorsQueueStore = create<ErrorQueueStore>((set, get) => ({
    errors: [],

    addError: (newError: AxiosError | Error) => {
        set((state) => (
            { errors: [...state.errors, parseError(newError)] }
        ));
    },

    popError: () => {
        const errors = get().errors;
        if (errors.length === 0) {
            return null;
        }
        const [firstError, ...remainingErrors] = errors;
        set({ errors: remainingErrors });
        return firstError;
    },

    clearErrors: () => {
        set({ errors: [] });
    },

}))

export default useErrorsQueueStore