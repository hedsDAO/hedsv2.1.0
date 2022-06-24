import React, { useEffect, useState, useRef } from 'react'
import { RootState, Dispatch } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { PlayIcon } from '@heroicons/react/solid'
import ReactLoading from 'react-loading'
import WaveSurfer from 'wavesurfer.js'

const formWaveSurferOptions = (ref: any) => ({
    container: ref,
    waveColor: '#eee',
    progressColor: '#f59e0b',
    cursorColor: 'transparent',
    barWidth: 6,
    barRadius: 2,
    responsive: true,
    height: 20,
    hideScrollbar: true,
    // backend: "MediaElement"
})

const GlobalAudio = () => {
    const dispatch = useDispatch<Dispatch>()
    const globalAudioData = useSelector(
        (state: RootState) => state.globalAudioModel,
    )

    const waveformRef = useRef(null)
    const wavesurfer = useRef<any>(null)
    const [playing, setPlay] = useState(false)
    const [volume, setVolume] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setPlay(false)
        const options = formWaveSurferOptions(waveformRef.current)
        wavesurfer.current = WaveSurfer.create(options)
        wavesurfer.current.load(globalAudioData?.trackDetails?.src)
        setLoading(true)
        wavesurfer.current.on('waveform-ready', () => {
            setLoading(false)
        })
        wavesurfer.current.on('ready', function () {
            if (wavesurfer.current) {
                setLoading(false)
                wavesurfer?.current?.setVolume(volume)
                setVolume(volume)
            }
        })
        wavesurfer.current.on('finish', () => { })
        return () => {
            wavesurfer.current.destroy()
        }
    }, [globalAudioData?.trackDetails])

    const handlePlayPause = () => {
        setPlay(!playing)
        wavesurfer.current.playPause()
    }

    useEffect(() => { }, [globalAudioData?.trackDetails?.src])
    return (
        <div className="bottom-0 fixed z-50">
            {globalAudioData && (
                <div className="bg-neutral-950 border-t-[0.25px] border-neutral-600 w-screen">
                    <div className="">
                        <div className="grid grid-cols-12 sm:grid-cols-10 items-center gap-2 lg:gap-8">
                            <div className="col-span-7 sm:col-span-2">
                                <div className="flex items-center">
                                    <img src={globalAudioData?.trackDetails?.tape_img} className='max-h-[5em] p-3' />
                                    <div className='flex flex-col justify-start'>
                                        <span className='text-neutral-300 inline-flex items-baseline lg:text-base text-sm whitespace-nowrap'>
                                            <i className="fa-thin fa-cassette-tape mr-2 text-sm"></i>{globalAudioData?.trackDetails?.tape}</span>
                                        <span className='uppercase text-neutral-300 inline-flex items-baseline lg:text-base text-sm whitespace-nowrap'>
                                            <i className="fa-thin fa-waveform mr-2 text-sm"></i> {globalAudioData?.trackDetails?.artist}</span>
                                    </div>
                                    <button
                                        disabled={loading}
                                        onClick={handlePlayPause}
                                        className="md:ml-auto mx-4 sm:mx-2"
                                    >
                                        {playing || loading ? (
                                            <ReactLoading
                                                className="h-10 w-10 my-auto rounded-full"
                                                type={'bars'}
                                                color={'#f59e0b'}
                                                height={'32'}
                                                width={'32'}
                                            />
                                        ) : (
                                            <PlayIcon
                                                className="w-10 h-10 text-center text-amber-500 z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-5 md:col-span-8 mx-2">
                                <div id="waveform" className="" ref={waveformRef} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GlobalAudio
