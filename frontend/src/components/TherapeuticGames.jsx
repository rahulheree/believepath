import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Wind, Sparkles, Brain, PlusCircle, X, Eye, Headset, Ear, Hand, ActivitySquare, Orbit, ArrowRightLeft, Sprout, Waves } from 'lucide-react';
import Matter from 'matter-js';

const TherapeuticGames = () => {
    const [activeGame, setActiveGame] = useState(null);

    return (
        <section id="games" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -ml-96 -mt-32 w-[800px] h-[800px] rounded-full bg-indigo-50 opacity-40 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-wide text-indigo-600 uppercase flex items-center justify-center gap-2">
                        <Gamepad2 className="w-5 h-5" /> Interactive Therapy
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Therapeutic Games
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                        Engage in mental wellness through evidence-based gamified experiences designed to reduce anxiety and build emotional resilience.
                    </p>
                </div>

                {!activeGame ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Game 1 Card */}
                        <div
                            onClick={() => setActiveGame('breathing')}
                            className="group bg-blue-50 rounded-3xl p-8 cursor-pointer hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm hover:shadow-md"
                        >
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                                <Wind className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Mindful Breathing</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                A guided, interactive breathing exercise to help regulate your nervous system and reduce acute stress immediately.
                            </p>
                            <span className="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>

                        {/* Game 2 Card */}
                        <div
                            onClick={() => setActiveGame('thought-pop')}
                            className="group bg-purple-50 rounded-3xl p-8 cursor-pointer hover:bg-purple-100 transition-colors border border-purple-100 shadow-sm hover:shadow-md"
                        >
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-purple-200">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Thought Popper</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                Write down negative or intrusive thoughts and visually destroy them to practice cognitive defusion and detachment.
                            </p>
                            <span className="text-purple-600 font-semibold group-hover:text-purple-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>

                        {/* Game 3 Card */}
                        <div
                            onClick={() => setActiveGame('grounding')}
                            className="group bg-teal-50 rounded-3xl p-8 cursor-pointer hover:bg-teal-100 transition-colors border border-teal-100 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-1"
                        >
                            <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-teal-200">
                                <ActivitySquare className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">5-4-3-2-1 Grounding</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                Practice staying grounded in the present moment by activating all five senses during times of overwhelming anxiety.
                            </p>
                            <span className="text-teal-600 font-semibold group-hover:text-teal-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                        {/* Game 4 Card */}
                        <div
                            onClick={() => setActiveGame('zen-orbit')}
                            className="group bg-indigo-50 rounded-3xl p-8 cursor-pointer hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm hover:shadow-md"
                        >
                            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
                                <Orbit className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Zen Orbit</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                Interact with floating, glowing orbs that represent your thoughts in a zero-gravity physics environment.
                            </p>
                            <span className="text-indigo-600 font-semibold group-hover:text-indigo-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>

                        {/* Game 5 Card */}
                        <div
                            onClick={() => setActiveGame('bilateral-flow')}
                            className="group bg-rose-50 rounded-3xl p-8 cursor-pointer hover:bg-rose-100 transition-colors border border-rose-100 shadow-sm hover:shadow-md"
                        >
                            <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-rose-200">
                                <ArrowRightLeft className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Bilateral Flow</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                De-escalate anxiety by guiding a light visually across the midline of your body to process distressing emotions.
                            </p>
                            <span className="text-rose-600 font-semibold group-hover:text-rose-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>

                        {/* Game 6 Card */}
                        <div
                            onClick={() => setActiveGame('infinite-garden')}
                            className="group bg-emerald-50 rounded-3xl p-8 cursor-pointer hover:bg-emerald-100 transition-colors border border-emerald-100 shadow-sm hover:shadow-md"
                        >
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-emerald-200">
                                <Sprout className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Infinite Garden</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                Feed a digital plant with positive affirmations and gratitude to actively practice positive priming.
                            </p>
                            <span className="text-emerald-600 font-semibold group-hover:text-emerald-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>

                        {/* Game 7 Card */}
                        <div
                            onClick={() => setActiveGame('breath-sync')}
                            className="group bg-cyan-50 rounded-3xl p-8 cursor-pointer hover:bg-cyan-100 transition-colors border border-cyan-100 shadow-sm hover:shadow-md"
                        >
                            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-cyan-200">
                                <Waves className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Breath Sync</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">
                                Hold to inhale and release to exhale, matching visual rhythm to physically lower your heart rate variability.
                            </p>
                            <span className="text-cyan-600 font-semibold group-hover:text-cyan-700 flex items-center gap-2">
                                Play Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col border border-slate-800">
                        {/* Game Header */}
                        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                {activeGame === 'breathing' && <><Wind className="w-5 h-5 text-blue-400" /> Mindful Breathing</>}
                                {activeGame === 'thought-pop' && <><Sparkles className="w-5 h-5 text-purple-400" /> Thought Popper</>}
                                {activeGame === 'grounding' && <><ActivitySquare className="w-5 h-5 text-teal-400" /> 5-4-3-2-1 Grounding</>}
                                {activeGame === 'zen-orbit' && <><Orbit className="w-5 h-5 text-indigo-400" /> Zen Orbit</>}
                                {activeGame === 'bilateral-flow' && <><ArrowRightLeft className="w-5 h-5 text-rose-400" /> Bilateral Flow</>}
                                {activeGame === 'infinite-garden' && <><Sprout className="w-5 h-5 text-emerald-400" /> Infinite Garden</>}
                                {activeGame === 'breath-sync' && <><Waves className="w-5 h-5 text-cyan-400" /> Breath Sync</>}
                            </h3>
                            <button
                                onClick={() => setActiveGame(null)}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Game Arena */}
                        <div className="flex-1 flex items-center justify-center p-8 relative">
                            <AnimatePresence mode="wait">
                                {activeGame === 'breathing' && <BreathingGame key="breathing" />}
                                {activeGame === 'thought-pop' && <ThoughtPopGame key="thought" />}
                                {activeGame === 'grounding' && <GroundingGame key="grounding" />}
                                {activeGame === 'zen-orbit' && <ZenOrbitGame key="zen-orbit" />}
                                {activeGame === 'bilateral-flow' && <BilateralFlowGame key="bilateral-flow" />}
                                {activeGame === 'infinite-garden' && <InfiniteGardenGame key="infinite-garden" />}
                                {activeGame === 'breath-sync' && <BreathSyncGame key="breath-sync" />}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

// --- Game 1: Mindful Breathing ---
const BreathingGame = () => {
    const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, hold2
    const [timeLeft, setTimeLeft] = useState(4);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setPhase((currentPhase) => {
                            if (currentPhase === 'inhale') return 'hold';
                            if (currentPhase === 'hold') return 'exhale';
                            if (currentPhase === 'exhale') return 'hold2';
                            return 'inhale';
                        });
                        return phase === 'inhale' ? 4 : phase === 'hold' ? 4 : phase === 'exhale' ? 4 : 4; // Box breathing 4-4-4-4
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, phase]);

    // Set duration based on phase transition
    useEffect(() => {
        if (phase === 'inhale' || phase === 'exhale' || phase === 'hold' || phase === 'hold2') {
            setTimeLeft(4);
        }
    }, [phase]);

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return "Breathe In...";
            case 'hold': return "Hold...";
            case 'exhale': return "Breathe Out...";
            case 'hold2': return "Hold...";
            default: return "";
        }
    };

    const getScale = () => {
        if (!isActive) return 1;
        switch (phase) {
            case 'inhale': return 2;
            case 'hold': return 2;
            case 'exhale': return 1;
            case 'hold2': return 1;
            default: return 1;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center w-full relative h-full"
        >
            {!isActive ? (
                <div className="space-y-6">
                    <Brain className="w-16 h-16 text-blue-400 mx-auto" />
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-2">Box Breathing</h4>
                        <p className="text-blue-200 max-w-sm">A technique to calm the nervous system. We will breathe in for 4 seconds, hold for 4, breathe out for 4, and hold for 4.</p>
                    </div>
                    <button
                        onClick={() => setIsActive(true)}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-transform hover:scale-105"
                    >
                        Start Exercise
                    </button>
                </div>
            ) : (
                <div className="relative flex items-center justify-center w-64 h-64 mt-12">
                    <motion.div
                        animate={{ scale: getScale() }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className={`absolute w-32 h-32 rounded-full opacity-20 ${phase === 'inhale' || phase === 'hold' ? 'bg-blue-400' : 'bg-teal-400'}`}
                    />
                    <motion.div
                        animate={{ scale: getScale() }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className={`absolute w-24 h-24 rounded-full opacity-40 mix-blend-screen ${phase === 'inhale' || phase === 'hold' ? 'bg-blue-300' : 'bg-teal-300'}`}
                    />

                    <div className="z-10 flex flex-col items-center">
                        <p className="text-white text-2xl font-bold tracking-widest mb-2 transition-all">{getInstruction()}</p>
                        <p className="text-blue-200 text-5xl font-light">{timeLeft}</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

// --- Game 2: Thought Popper ---
const ThoughtPopGame = () => {
    const [thoughts, setThoughts] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addThought = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setThoughts([...thoughts, {
            id: Date.now(),
            text: inputValue,
            x: Math.random() * 60 + 20, // 20% to 80%
            y: Math.random() * 40 + 20,
            color: ['bg-red-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500'][Math.floor(Math.random() * 4)]
        }]);
        setInputValue('');
    };

    const popThought = (id) => {
        setThoughts(thoughts.filter(t => t.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col"
        >
            <div className="flex-1 relative overflow-hidden mt-12 mb-6">
                {thoughts.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none">
                        <Sparkles className="w-12 h-12 text-slate-700 mb-4 opacity-50" />
                        <p>Type a negative thought below to materialize it.</p>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none opacity-20">
                        <p>Tap the bubbles to release them.</p>
                    </div>
                )}

                <AnimatePresence>
                    {thoughts.map((thought) => (
                        <motion.button
                            key={thought.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: [-10, 10, -10]
                            }}
                            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 0.2 },
                                exit: { duration: 0.3 }
                            }}
                            onClick={() => popThought(thought.id)}
                            className={`absolute ${thought.color} z-30 text-white px-6 py-4 rounded-full shadow-xl shadow-black/20 font-medium max-w-[200px] hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center overflow-hidden`}
                            style={{ left: `${thought.x}%`, top: `${thought.y}%` }}
                        >
                            <span className="truncate w-full">{thought.text}</span>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            <form onSubmit={addThought} className="relative z-20 mx-auto w-full max-w-md">
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g., I'm not good enough..."
                        className="w-full bg-slate-800 text-white border-2 border-slate-700 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-purple-500 transition-colors"
                        maxLength={40}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-2 top-2 bottom-2 w-10 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

// --- Game 3: 5-4-3-2-1 Grounding ---
const GroundingGame = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "5 Things You See",
            icon: <Eye className="w-12 h-12 text-teal-400 mb-4 mx-auto" />,
            instruction: "Look around you. Acknowledge 5 things that you can see. It could be a pen, a spot on the ceiling, or a plant.",
            count: 5
        },
        {
            title: "4 Things You Can Touch",
            icon: <Hand className="w-12 h-12 text-teal-400 mb-4 mx-auto" />,
            instruction: "Focus on your sense of touch. Acknowledge 4 things you can feel. The texture of your clothes, the smooth table, or the ground under your feet.",
            count: 4
        },
        {
            title: "3 Things You Hear",
            icon: <Ear className="w-12 h-12 text-teal-400 mb-4 mx-auto" />,
            instruction: "Listen carefully. Acknowledge 3 external sounds you can hear. A distant car, the hum of a refrigerator, or birds outside.",
            count: 3
        },
        {
            title: "2 Things You Smell",
            icon: <Wind className="w-12 h-12 text-teal-400 mb-4 mx-auto" />,
            instruction: "Take a deep breath. Acknowledge 2 things you can smell. Coffee, your own perfume, or the fresh air.",
            count: 2
        },
        {
            title: "1 Good Thing",
            icon: <Sparkles className="w-12 h-12 text-teal-400 mb-4 mx-auto" />,
            instruction: "Acknowledge 1 positive thing about yourself or your current situation right now.",
            count: 1
        }
    ];

    if (step >= steps.length) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center h-full">
                <Brain className="w-16 h-16 text-teal-400 mb-6" />
                <h4 className="text-3xl font-bold text-white mb-4">You are Grounded</h4>
                <p className="text-teal-100 max-w-md mb-8">
                    You have successfully engaged your senses and returned to the present moment. Take a final deep breath.
                </p>
                <button
                    onClick={() => setStep(0)}
                    className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold transition-all"
                >
                    Restart Exercise
                </button>
            </motion.div>
        );
    }

    const currentData = steps[step];

    return (
        <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center justify-center text-center w-full h-full p-6"
        >
            {currentData.icon}
            <h4 className="text-2xl font-bold text-white mb-2">{currentData.title}</h4>
            <p className="text-slate-300 max-w-md text-lg mb-8">{currentData.instruction}</p>

            <button
                onClick={() => setStep(step + 1)}
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white rounded-full font-bold transition-all flex items-center gap-2"
            >
                I have done this →
            </button>
            <div className="flex gap-2 mt-12">
                {steps.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i === step ? 'bg-teal-400' : 'bg-slate-700'}`} />
                ))}
            </div>
        </motion.div>
    );
};

// --- Game 4: Zen Orbit ---
const ZenOrbitGame = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Matter.js setup
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies;

        const engine = Engine.create({ gravity: { x: 0, y: 0, scale: 0 } });
        engineRef.current = engine;
        const world = engine.world;

        const containerNode = sceneRef.current;
        const width = containerNode.clientWidth;
        const height = containerNode.clientHeight;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: 'transparent'
            }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Define boundaries
        const wallOptions = { isStatic: true, render: { visible: false } };
        World.add(world, [
            Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
            Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
            Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
            Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions)
        ]);

        // Add drifting mood orbs
        const orbs = Array.from({ length: 10 }).map(() => {
            const radius = Math.random() * 20 + 20;
            return Bodies.circle(
                Math.random() * width,
                Math.random() * height,
                radius,
                {
                    restitution: 0.9,
                    friction: 0.005,
                    frictionAir: 0.01,
                    render: {
                        fillStyle: ['#818cf8', '#c084fc', '#f472b6', '#34d399'][Math.floor(Math.random() * 4)]
                    }
                }
            );
        });
        World.add(world, orbs);

        // Set initial gentle velocity
        orbs.forEach(orb => {
            Matter.Body.setVelocity(orb, { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
        });

        // Add Mouse Control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        World.add(world, mouseConstraint);
        render.mouse = mouse;

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            World.clear(world);
            Engine.clear(engine);
        };
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative">
            <div className="absolute top-4 left-0 w-full text-center pointer-events-none z-10">
                <p className="text-indigo-200">Drag and gently flick the floating thoughts away to clear your mind.</p>
            </div>
            <div ref={sceneRef} className="w-full h-[400px] cursor-grab active:cursor-grabbing rounded-xl overflow-hidden" />
        </motion.div>
    );
};

// --- Game 5: Bilateral Flow ---
const BilateralFlowGame = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            <h4 className="text-2xl font-bold text-white mb-2 z-10">Follow the Light</h4>
            <p className="text-rose-200 max-w-sm text-center mb-16 z-10">Keep your head completely still. Follow the moving light with your eyes only to process distress.</p>

            <div className="w-full max-w-2xl h-1 bg-slate-800 rounded-full relative">
                <motion.div
                    initial={{ left: "0%" }}
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{ ease: "easeInOut", duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 -translate-y-1/2 w-16 h-16 bg-rose-500 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.8)]"
                />
            </div>
        </motion.div>
    );
};

// --- Game 6: Infinite Garden ---
const InfiniteGardenGame = () => {
    const [growth, setGrowth] = useState(0);

    const feedPlant = () => {
        setGrowth(prev => Math.min(prev + 10, 100));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center">
            <h4 className="text-2xl font-bold text-white mb-8">Nurture Positivity</h4>

            <div className="relative w-48 h-48 mb-12 flex items-end justify-center">
                <motion.div
                    className="bg-emerald-500 rounded-t-full origin-bottom shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                    animate={{
                        height: `${growth}%`,
                        width: `${Math.max(10, growth)}%`,
                        borderTopLeftRadius: '100px',
                        borderTopRightRadius: '100px'
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                />

                {growth >= 100 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-12 text-5xl">🌸</motion.div>
                )}
            </div>

            <div className="text-center">
                <p className="text-emerald-200 mb-6">Click to feed the plant with an invisible affirmation.</p>
                <button
                    onClick={feedPlant}
                    disabled={growth >= 100}
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 text-white rounded-full font-bold transition-all"
                >
                    {growth >= 100 ? 'Fully Grown!' : 'Reflect & Feed 🌱'}
                </button>
            </div>

            <div className="w-64 h-2 bg-slate-800 rounded-full mt-8 overflow-hidden">
                <motion.div className="h-full bg-emerald-500" animate={{ width: `${growth}%` }} />
            </div>
        </motion.div>
    );
};

// --- Game 7: Breath Sync ---
const BreathSyncGame = () => {
    const [isHolding, setIsHolding] = useState(false);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center">
            <h4 className="text-2xl font-bold text-white mb-4">Breath Sync</h4>
            <p className="text-cyan-200 max-w-sm text-center mb-12">Hold down the button to inhale, and release it to exhale. Mirror the shape to control your heart rate.</p>

            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                <motion.div
                    animate={{
                        scale: isHolding ? 1.5 : 0.8,
                        backgroundColor: isHolding ? '#22d3ee' : '#1e3a8a', // cyan to deep blue
                        rotate: isHolding ? 90 : 0,
                        borderRadius: isHolding ? '50%' : '10%'
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="w-32 h-32 absolute shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center justify-center opacity-80"
                />
            </div>

            <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)}
                onTouchStart={(e) => { e.preventDefault(); setIsHolding(true); }}
                onTouchEnd={(e) => { e.preventDefault(); setIsHolding(false); }}
                className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-xl active:scale-95 transition-transform"
            >
                Hold to Inhale
            </button>
        </motion.div>
    );
};

export default TherapeuticGames;
