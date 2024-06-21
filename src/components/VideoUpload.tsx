"use client";

import axios from "axios";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

interface Props {
  video?: string | null;
}

export default function VideoUpload({ video: currentVideo }: Props) {
  const [video, setVideo] = useState<string>(currentVideo || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsUploading(true);

    const files = event.target.files;

    if (files && files.length > 0) {
      const currentFile = files[0];
      const data = new FormData();
      data.append("company-video", currentFile);

      const response = await axios.post("/api/upload/home-page", data);
      setVideo(response.data.link);
    }
    setIsUploading(false);
  };

  const deleteVideo = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      const key = video.split("vendor-videos/").pop();
      const response = await axios.delete(`/api/upload/home-page/${key}`);

      if (response.status === 200) {
        setVideo("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-8 md:flex gap-6">
      {!video ? (
        <label className="md:mx-0 mx-auto mt-4 mb-6 max-w-[400px] h-[325px] w-full flex flex-col items-center justify-center text-center p-3 border-2 border-dashed border-secondary-variant rounded-lg hover:bg-secondary-variant/20 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 stroke-secondary-variant text-secondary-variant"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="mt-4 text-lg font-bold text-secondary-variant">
            Select video to upload
          </p>
          <p className="mt-1.5 text-sm text-secondary-variant">
            Or drag and drop a file
          </p>
          <p className="mt-8 text-sm text-secondary-variant">MP4</p>
          <p className="mt-2 text-sm text-secondary-variant">
            Up to 30 minutes
          </p>
          <p className="mt-2 text-sm text-secondary-variant">Less than 2 GB</p>
          <label className="btn-primary-filled mt-4 p-1">
            Select File{" "}
            <input
              type="file"
              className="hidden"
              onChange={async (event) => await uploadVideo(event)}
              accept=".mp4"
            />
          </label>
        </label>
      ) : (
        <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[400px] h-[325px] p-3 rounded-2xl cursor-pointer relative">
          {isUploading ? (
            <div className="absolute flex items-center justify-center z-20 bg-black text-on-primary h-full w-full rounded-[50px] bg-opacity-50">
              <div className="mx-uto flex items-center justify-cneter gap-1">
                <span className="uploadLoader"></span>
                <div className="font-bold">Uploading...</div>
              </div>
            </div>
          ) : null}
          s
          <VideoPlayer
            src={video}
            className="absolute rounded-xl z-10 p-[13px] w-full h-full"
          />
          <input
            id="company-video"
            name="company-video"
            defaultValue={video}
            hidden
          />
          <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border border-on-background w-full p-2">
            <div className="flex items-center truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="text-sm pl-1 truncate">
                {video.split("vendor-videos/").pop()}
              </p>
            </div>
            <button className="btn-primary-text" onClick={deleteVideo}>
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
