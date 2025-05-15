import ReactPlayer from "react-player";

const VideoEmbed = ({ src, index }) => {
    if (!ReactPlayer.canPlay(src)) {
        return null;
    }

    return (
        <div key={`video-${index}`} className="w-full flex justify-center lg:justify-start pt-10">
            <div className="inline-block w-[99%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] aspect-[16/9] relative">
                <ReactPlayer
                    url={src}
                    className="absolute top-0 left-0"
                    width="100%"
                    height="100%"
                    controls
                    config={{
                        youtube: {
                            playerVars: {
                                origin: window.location.origin,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default VideoEmbed;
