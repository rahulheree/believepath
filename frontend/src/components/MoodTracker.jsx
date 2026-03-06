import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { Camera, Image as ImageIcon, Upload, Activity, Brain, Smile, AlertCircle, RefreshCw, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MoodTracker = () => {
    const [mode, setMode] = useState(null); // 'camera', 'upload', 'results'
    const [isScanning, setIsScanning] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

    // Mock analysis results
    const [analysisResult, setAnalysisResult] = useState(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);
            setMode('camera');
        } catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Unable to access camera. Please check your permissions.");
        }
    };

    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceExpressionNet.loadFromUri('/models')
                ]);
                setModelsLoaded(true);
            } catch (err) {
                console.error("Error loading models", err);
            }
        };
        loadModels();
    }, []);

    useEffect(() => {
        if (mode === 'camera' && videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mode, mediaStream]);

    const stopCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setMode('upload');
            };
            reader.readAsDataURL(file);
        }
    };

    const runAnalysis = async () => {
        if (!modelsLoaded) return;
        setIsScanning(true);

        const analyzeFace = async () => {
            try {
                let detection;
                if (mode === 'camera' && videoRef.current) {
                    detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
                } else if (mode === 'upload' && imageRef.current) {
                    detection = await faceapi.detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
                }

                if (detection) {
                    const expressions = detection.expressions;
                    const topExpression = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b);
                    const emotion = topExpression[0];
                    const confidence = Math.round(topExpression[1] * 100);

                    const emotionMap = {
                        neutral: 'Neutral',
                        happy: 'Joyful',
                        sad: 'Sad',
                        angry: 'Angry',
                        fearful: 'Fearful',
                        disgusted: 'Disgusted',
                        surprised: 'Surprised'
                    };
                    const dominantEmotion = emotionMap[emotion] || emotion;

                    let stress = 20;
                    let focus = 60;
                    let energy = 50;
                    let summary = '';

                    switch (emotion) {
                        case 'happy':
                            stress = Math.random() * 20 + 10;
                            focus = Math.random() * 20 + 70;
                            energy = Math.random() * 20 + 70;
                            summary = "High joy detected. Your facial expressions are deeply relaxed, indicating an optimal, elevated state for collaborative activities.";
                            break;
                        case 'angry':
                        case 'disgusted':
                            stress = Math.random() * 20 + 80;
                            focus = Math.random() * 30 + 50;
                            energy = Math.random() * 30 + 70;
                            summary = "Elevated muscle tension detected. Your state indicates significant stress or agitation. Highly recommend a 5-minute break.";
                            break;
                        case 'sad':
                        case 'fearful':
                            stress = Math.random() * 30 + 60;
                            focus = Math.random() * 30 + 30;
                            energy = Math.random() * 20 + 20;
                            summary = "Lower energy expressions detected. You might be experiencing fatigue or lower emotional resilience right now.";
                            break;
                        case 'surprised':
                            stress = Math.random() * 20 + 40;
                            focus = Math.random() * 20 + 80;
                            energy = Math.random() * 20 + 80;
                            summary = "High stimulation detected. You are highly alert, which is exceptional for rapid learning but might cause burnout if sustained.";
                            break;
                        default:
                            stress = Math.random() * 20 + 30;
                            focus = Math.random() * 20 + 60;
                            energy = Math.random() * 20 + 50;
                            summary = "Your micro-expressions indicate a baseline, neutral state. Excellent for steady, uninterrupted work.";
                    }

                    setAnalysisResult({
                        dominantEmotion,
                        stressLevel: Math.round(stress),
                        focusEngagement: Math.round(focus),
                        energyLevel: Math.round(energy),
                        confidence,
                        summary
                    });
                } else {
                    setAnalysisResult({
                        dominantEmotion: 'Not Detected',
                        stressLevel: 0,
                        focusEngagement: 0,
                        energyLevel: 0,
                        confidence: 0,
                        summary: "We couldn't detect a face clearly. Please ensure you are well-lit and looking directly at the camera/photo."
                    });
                }
            } catch (err) {
                console.error("Face analysis failed", err);
            }
            setIsScanning(false);
            setMode('results');
            stopCamera();
        };

        // Add an artificial delay so the scanning UI shows for at least a short 1.5s duration
        setTimeout(analyzeFace, 1500);
    };

    useEffect(() => {
        // Cleanup camera on unmount
        return () => stopCamera();
    }, [mediaStream]);

    const resetTracker = () => {
        setImageSrc(null);
        setAnalysisResult(null);
        setMode(null);
    };

    return (
        <section id="mood-tracker" className="py-24 bg-teal-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-teal-100 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-wide text-teal-600 uppercase">AI Emotion Analysis</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Real-time Mood Tracking
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                        Quantify your emotional well-being instantly. Scan your face to receive a detailed, data-driven analytical report on your current emotional state.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="p-8 sm:p-10">

                        {!mode && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-12">
                                <button
                                    onClick={startCamera}
                                    className="group flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-teal-300 rounded-2xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Camera className="w-10 h-10 text-teal-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">Use Web Camera</h3>
                                    <p className="text-sm text-slate-500 mt-2">Live scan & analyze</p>
                                </button>

                                <div className="text-slate-400 font-medium">OR</div>

                                <button
                                    onClick={handleUploadClick}
                                    className="group flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-blue-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <ImageIcon className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">Upload Photo</h3>
                                    <p className="text-sm text-slate-500 mt-2">Analyze an existing image</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </button>
                            </div>
                        )}

                        {(mode === 'camera' || mode === 'upload') && (
                            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center shadow-inner">
                                {mode === 'camera' && (
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {mode === 'upload' && imageSrc && (
                                    <img
                                        ref={imageRef}
                                        src={imageSrc}
                                        alt="Uploaded for analysis"
                                        className="w-full h-full object-contain"
                                        crossOrigin="anonymous"
                                    />
                                )}

                                {isScanning && (
                                    <motion.div
                                        initial={{ top: '0%' }}
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="absolute left-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,1)] z-20"
                                    />
                                )}

                                {isScanning && (
                                    <div className="absolute inset-0 bg-teal-900/20 z-10 flex items-center justify-center backdrop-blur-sm">
                                        <div className="flex flex-col items-center">
                                            <ScanFace className="w-16 h-16 text-teal-400 animate-pulse mb-4" />
                                            <p className="text-white font-semibold text-lg animate-pulse">Analyzing Micro-expressions...</p>
                                        </div>
                                    </div>
                                )}

                                {!isScanning && (
                                    <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 z-20">
                                        <button
                                            onClick={runAnalysis}
                                            disabled={!modelsLoaded}
                                            className={`px-8 py-3 text-white font-bold rounded-full shadow-lg transition-all flex items-center gap-2 ${modelsLoaded ? 'bg-teal-600 hover:bg-teal-700 hover:scale-105' : 'bg-slate-400 cursor-not-allowed'}`}
                                        >
                                            <Activity className="w-5 h-5" /> {modelsLoaded ? 'Start Analysis' : 'Loading ML Models...'}
                                        </button>
                                        <button
                                            onClick={resetTracker}
                                            className="px-6 py-3 bg-slate-800 text-white font-medium rounded-full shadow-lg hover:bg-slate-700 transition-all flex items-center gap-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {mode === 'results' && analysisResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                                            <Smile className="w-7 h-7 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">Analysis Complete</h3>
                                            <p className="text-slate-500">Confidence Score: <span className="text-teal-600 font-semibold">{analysisResult.confidence}%</span></p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetTracker}
                                        className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors font-medium"
                                    >
                                        <RefreshCw className="w-5 h-5" /> New Scan
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">Dominant State</p>
                                        <p className="text-3xl font-extrabold text-slate-900">{analysisResult.dominantEmotion}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <div className="flex justify-between items-end mb-2">
                                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Stress Level</p>
                                            <p className="text-2xl font-bold text-slate-900">{analysisResult.stressLevel}%</p>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${analysisResult.stressLevel}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <div className="flex justify-between items-end mb-2">
                                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Engagement</p>
                                            <p className="text-2xl font-bold text-slate-900">{analysisResult.focusEngagement}%</p>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${analysisResult.focusEngagement}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-teal-50 rounded-2xl p-6 sm:p-8 flex gap-6">
                                    <Brain className="w-10 h-10 text-teal-600 shrink-0 hidden sm:block" />
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">Clinical Summary</h4>
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            {analysisResult.summary}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-sm text-teal-700 font-medium bg-teal-100/50 w-fit px-4 py-2 rounded-full">
                                            <AlertCircle className="w-4 h-4" /> Recommendation: Consider taking a 5-minute deep breathing break to optimize energy.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoodTracker;
