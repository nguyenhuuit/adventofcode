import React, { useEffect, useMemo, useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import chokidar from 'chokidar';
import Spinner from './Spinner.js';
import { useSolutionFile } from '../hooks/useSolutionFile.js';
import { useInputFile } from '../hooks/useInputFile.js';
import { execute, terminate } from '../../utils/executors.js'
import { HELP_MESSAGE } from './constants.js';

const watcher = chokidar.watch([])

const App = ({ state }: any) => {
	const {exit} = useApp();

	const [inputMode, setInputMode] = useState(state.input)
	const [part, setPart] = useState(state.part)
	const [output, setOutput] = useState(state.output);
	const [answer, setAnswer] = useState<any>('');
	const [perfLog, setPerfLog] = useState('');
	const [loading, setLoading] = useState(false);

	const solutionFile = useSolutionFile(state.year, state.day, part, state.language);
	const inputFile = useInputFile(state.year, state.day, inputMode);

	const executeSolution = async (s: any) => {
		setLoading(true)
		setOutput('')
		setPerfLog('')
		const { stdout, stderr, error } = await execute(s)
		if (error) {
			setAnswer(undefined)
			setPerfLog('')
			setOutput([stdout, stderr].join('\n'))
		} else {
			const lines = stdout.trim().split(/\n/);
			const op = lines.slice(0,lines.length -2).join('\n');
			const ans = lines[lines.length - 2];
			const pl = lines[lines.length - 1];
			setAnswer(ans)
			setOutput(op)
			setPerfLog(pl)
		}
		setLoading(false)
	}

	useEffect(() => {
		watcher.add(solutionFile);
		watcher.on('change', async () => {
			if (state.language === 'javascript') {
				delete require.cache[require.resolve(solutionFile)];
			}
			const s = { year: state.year, day: state.day, part, input: inputMode, language: state.language }
			await executeSolution(s)
		});
		return () => {
			watcher.unwatch(solutionFile)
		}
	}, [solutionFile])
	useEffect(() => {
		watcher.add(inputFile);
		watcher.on('change', async () => {
			if (state.language === 'javascript') {
				delete require.cache[require.resolve(solutionFile)];
			}
			const s = { year: state.year, day: state.day, part, input: inputMode, language: state.language }
			await executeSolution(s)
		});
		return () => {
			watcher.unwatch(inputFile)
		}
	}, [inputFile])

	useInput(async (input, key) => {
		switch (input) {
			case 'q': exit(); break;
			case 'i': {
				setInputMode("input");
				const s = { year: state.year, day: state.day, part, input: 'input', language: state.language }
				await executeSolution(s)
				break;
			}
			case 's': {
				setInputMode("sample");
				const s = { year: state.year, day: state.day, part, input: 'sample', language: state.language }
				await executeSolution(s)
				break;
			}
			case 'c': setOutput(''); break;
			case '1': {
				setPart(1);
				const s = { year: state.year, day: state.day, part: 1, input: inputMode, language: state.language }
				await executeSolution(s)
				break;
			}
			case '2': {
				setPart(2);
				const s = { year: state.year, day: state.day, part: 2, input: inputMode, language: state.language }
				await executeSolution(s)
				break;
			}
			case 'x': {
				terminate();
				setTimeout(() => setOutput('Terminated!'), 100)
				break;
			}
			case 'h': {
				setOutput(HELP_MESSAGE);
				break;
			}
		}
		if (key.downArrow) {
			setInputMode("input")
			const s = { year: state.year, day: state.day, part, input: 'input', language: state.language }
			await executeSolution(s)
		}
		if (key.upArrow) {
			setInputMode("sample")
			const s = { year: state.year, day: state.day, part, input: 'sample', language: state.language }
			await executeSolution(s)
		}
		if (key.return) {
			const s = { year: state.year, day: state.day, part, input: inputMode, language: state.language }
			await executeSolution(s)
		}
	})
	useEffect(() => {
		const s = { year: state.year, day: state.day, part, input: inputMode, language: state.language }
		executeSolution(s);
		return () => {}
	}, [])
	return (
		<>
			<Box>
				<Text>Year:</Text>
				<Text italic bold color={"#FF8800"}> {state.year} </Text>
				<Text>Day:</Text>
				<Text italic bold color={"#FF8800"}> {state.day} </Text>
				<Text>Part:</Text>
				<Text italic bold color={"#FF8800"}> {part} </Text>
				<Text>Language:</Text>
				<Text italic bold color={"#FF8800"}> {state.language} </Text>
			</Box>
			<Box height={1}/>
			<Box width={100}>
				<Box flexDirection="column" width={30}>
					<Text>{`👁️  ${solutionFile}`}</Text>
					<Text>{`👁️  ${inputFile}`}</Text>
				</Box>
				<Box flexDirection="column" width={50}>
					<Text>{`${ inputMode === 'sample' ? '👉' : '  '} ${state.year}/day${state.day}/sample.txt`}</Text>
					<Text>{`${ inputMode === 'input' ? '👉' : '  '} ${state.year}/day${state.day}/input.txt`}</Text>
				</Box>
			</Box>
			<Box height={1}/>
			<Box>
				<Text color="yellowBright"><Spinner type="earth" loading={loading}/></Text>
				<Text color="green">{`Result: `}</Text>
				<Text color="green" bold>{ loading ? <Spinner type="simpleDots" loading={true}/> : answer }</Text>
				{ (answer && !loading) && <Text>{`   ⏱ ${perfLog}`}</Text>}
			</Box>
			
			{output && (
				<>
					<Box height={1}/>
					<Box borderTop flexDirection="column">
						<Text>{output}</Text>
					</Box>
				</>
			)}
			
		</>
		
	);
}

export default App;
