# [Advent of Code](https://adventofcode.com/)

## About This Repository

This repository contains solutions to Advent of Code problems, which is an annual programming challenge that runs from December 1st to December 25th. Each day presents two programming puzzles that test your problem-solving skills and coding abilities. The problems start simple and gradually increase in difficulty, making it perfect for both beginners and experienced programmers.

## Personal Context

I created this repository as part of teaching my son, **Gia Vinh** (11 years old), Python programming. I chose Advent of Code as our learning platform because it offers engaging, practical problems that are more interesting and motivating than traditional theory-based learning. Each puzzle provides a real-world context that makes learning programming concepts more tangible and fun.

Most of the solutions in this repository are written by Gia Vinh as part of his learning journey. You can see his progress through the commit history, where he gradually improves his coding style and problem-solving approaches. This repository serves as a living documentation of his growth as a young programmer, from his first attempts at solving simple puzzles to tackling more complex challenges.

Note: Sharing solutions is not against Advent of Code's policy, as they encourage learning and discussion within the community.

## About the Tool

This repository uses a custom CLI tool (`@nguyenhuu/adventofcode`) that makes solving Advent of Code problems more efficient and enjoyable. The tool provides several key features:

- **Easy Setup**: Just install the package and configure your session key
- **Automatic Test Data**: Automatically fetches test data from Advent of Code website
- **Multiple Language Support**: Write solutions in Python, JavaScript, Go, or Java
- **Interactive Mode**: Real-time solution testing and submission
- **Hot Keys**: Quick access to common operations like switching between sample/real input, submitting solutions, and more

## Quick Guide

1. **Install the Tool**
   ```bash
   npm install -g @nguyenhuu/adventofcode
   ```

2. **Get Your Session Key**
   - Log in to [Advent of Code](https://adventofcode.com)
   - Open browser dev tools (F12)
   - Go to Application tab → Cookies
   - Copy the value of the `session` cookie

3. **Configure Your Environment**
   - Create a `.env` file in your project root
   - Add your session key: `SESSION=your_session_key_here`

4. **Start Solving**
   ```bash
   adventofcode -d 1 -p 1 -y 2023 -l python
   ```

5. **Use Hot Keys**
   - Press `s` to test with sample input
   - Press `i` to test with real input
   - Press `u` to submit your solution
   - Press `h` for help

![demo](https://cdn.huu.app/images/adventofcode-runner.png)

For more detailed information about the tool's features and configuration options, visit the [official repository](https://www.npmjs.com/package/@nguyenhuu/adventofcode).

