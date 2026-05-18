export default function TerminalPrompt({ command, path = '~$' }) {
  return (
    <div className="terminal-prompt">
      <span className="prompt-user">user</span>
      <span className="prompt-at"> @</span>
      <span className="prompt-host">krishbansal</span>
      <span className="prompt-colon"> : </span>
      <span className="prompt-path">{path}</span>
      <span className="prompt-cmd">{command}</span>
    </div>
  )
}
