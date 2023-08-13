import React, {createContext} from "react";

export interface SetStateContext<T> {
    value: T;
    setValue?: React.Dispatch<React.SetStateAction<T>>;
}

export interface IRetroRedContext {
    worldID: SetStateContext<boolean>;
}

export const RetroRedContext = createContext<IRetroRedContext>({
    worldID: {
        value: false,
    }
});
