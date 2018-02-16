import express from 'express'
import fs from 'fs'

const app = express()

app.get('/', (req, res) => {
    
    const file  = fs.readFileSync('./programs/add_bin', 'utf8')
                    .split('\n')
                    .filter((el) => el != '')
    
    const position  = file.shift()
    const tape      = Array.from(file.shift())
    const rules     = file.map((rule) => rule.split(' '))
    
    const action = (state, position) => {
        
        const rule = rules.find((rule) => rule[0] == state && rule[1] == tape[position] ) || []
        const [,, valueNew, move, stateNew] = rule
        
        if(rule && rule.length > 0) {
            tape[position] = valueNew
            move == 'R' ? position ++ : position --
            
            action(stateNew, position)
        }
        else
            res.send(tape.join(''));
    }
    
    action('0', position)
})

app.listen(8080)