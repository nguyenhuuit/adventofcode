import React, { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from './Spinner.js';
import { useSolutionFile } from '../hooks/useSolutionFile.js';
import { useInputFile } from '../hooks/useInputFile.js';
import { execute } from '../../utils/executors.js'

const App = ({ state }: any) => {
	const {exit} = useApp();

	const [inputMode, setInputMode] = useState(state.input)
	const [part, setPart] = useState(state.part)
	const [output, setOutput] = useState(state.output);
	const [answer, setAnswer] = useState('')

	const solutionFile = useSolutionFile(state.year, state.day, part, state.language);
	const inputFile = useInputFile(state.year, state.day, inputMode);

	const executeSolution = async (s: any) => {
		const rs = await execute(s)
		setAnswer(rs)
	}

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
		}
		if (key.downArrow) {
			setInputMode("input")
		}
		if (key.upArrow) {
			setInputMode("sample")
		}
	})
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
			<Text>
				<Text color="green">
					<Spinner type="dots" loading={true}/>
					{ answer !== undefined && (
						<Text> Result: {answer}</Text>
					)}
				</Text>
			</Text>
			
			{output && (
				<>
					<Box height={1}/>
					<Box borderTop flexDirection="column">
						<Text>Output:</Text>
						<Text>{output}</Text>
					</Box>
				</>
			)}
			
		</>
		
	);
}

export default App;
