"use client";
import React, { useEffect, useState } from 'react';

export default function useStream(stream= null) {
  const [state, setState] = useState(stream);
  const [status, setStatus] = useState('loading');

  const [m, setM] = useState(false);
  const [v, setV] = useState(true);

  useEffect(() => {
    if (stream) {
      setStatus('idle');

      const [audio, video] = stream.getTracks();
      setM(!audio.enabled);
      setV(video.enabled);
    } else {
      (async function createStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
          });

          setState(stream);
          setStatus('success');
        } catch (error) {
          setStatus('rejected');
          console.error('Access denied for audio and video stream', error);
        }
      })();
    }
  }, []);


  return {
    stream: state,
    muted: m,
    visible: v,
    isLoading: status == 'loading',
    isError: status == 'rejected',
    isSuccess: status == 'success' || status == 'idle',
  };
}
