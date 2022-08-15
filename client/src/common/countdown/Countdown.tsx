import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";

interface CountdownProps {
    deadline: string;
    setIsMintOpen?: Function
}

const DateCountdown = ({ deadline, setIsMintOpen }: CountdownProps) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [done, setDone] = useState(false);
    const dispatch = useDispatch<Dispatch>();

    const getTimeUntil = (deadline: string) => {
        const currentTime = new Date();
        const time = Date.parse(deadline) - Date.parse(String(currentTime));
        if (time < 0) {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setDays(0);
            setDone(true);
            if (setIsMintOpen) setIsMintOpen(true)
        } else {
            setSeconds(Math.floor((time / 1000) % 60));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        }
    };

    useEffect(() => {
        if (done) {
            dispatch.globalTapesModel.updateTapeStatus("4");
        } else getTimeUntil(deadline);
    }, [done]);

    useEffect(() => {
        const intervalTimer = setInterval(() => getTimeUntil(deadline), 1000);
        if (!done) intervalTimer;
        return () => {
            clearInterval(intervalTimer);
        };
    }, [deadline]);

    const leading0 = (num: number) => {
        return num < 10 ? "0" + num : num;
    };

    return (
        <div className="mt-1">
            {done ? (
                <div className="countdown-box flex">
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{days}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">D</h5>
                    </div>
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{hours}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">H</h5>
                    </div>
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{minutes}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">M</h5>
                    </div>
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{seconds}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">S</h5>
                    </div>
                </div>
            ) : (
                <div className="countdown-box flex">
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{leading0(days)}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">D</h5>
                    </div>
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{leading0(hours)}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">H</h5>
                    </div>
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{leading0(minutes)}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">M</h5>
                    </div>
                    <div className="flex mr-1">
                        <div className="text-neutral-200 mr-1 text-[1.05rem]">{leading0(seconds)}</div>
                        <h5 className="text-neutral-400 text-[1.05rem]">S</h5>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateCountdown;