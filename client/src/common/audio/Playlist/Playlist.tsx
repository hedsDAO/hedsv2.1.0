import React from "react";
import { PlaylistProps, TapeTrack } from "../../../models/common";

const Playlist = ({ tapeData, selectedTrack, setSelectedTrack }: PlaylistProps) => {
  return (
    <>
      <h1 className="text-neutral-300 text-left font-sans uppercase font-thin tracking-widest my-2 px-2">FEATURING</h1>
      {tapeData.map((track: TapeTrack) => (
        <button
          key={track.id}
          className={
            track.id == selectedTrack
              ? "flex items-center text-amber-500 hover:text-neutral-500 mt-4 justify-evenly w-full px-3"
              : "flex items-center text-neutral-500 hover:text-amber-500 mt-4 justify-evenly w-full px-3"
          }
          onClick={() => setSelectedTrack(track.id)}
        >
          <img
            className="h-6 w-6 ring-1 ring-neutral-800 rounded-full my-auto mr-auto p-0.5"
            src={track.image}
            alt={track.title}
          />
          <p className="text-sm font-bold tracking-widest uppercase ease-in-out duration-300 pl-10">{track.title}</p>
        </button>
      ))}
    </>
  );
};

export default Playlist;
