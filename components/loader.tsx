import { CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";

const override: CSSProperties = {
    display: "block"
};

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center
        justify-center">
            <ClockLoader
                cssOverride={override}
                color="blue"
                size={35}
            />
            <p>
                Please Wait
            </p>
        </div>
    )
}