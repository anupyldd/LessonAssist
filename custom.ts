
namespace lesson {
    /**
     * Teleports the agent to player's position facing the same direction as the player
     */
    //% block
    export function agent_call(): void {
        agent.teleport(
            player.position(),
            positions.toCompassDirection(player.getOrientation())
        )
    };
    
    /**
     * Set the direction the agent is facing
     * @param direction CompassDirection in which the agent will look
     */
    //% block
    export function agent_face(direction: CompassDirection): void {
        agent.teleport(agent.getPosition(), direction)
    };
    
    /**
     * Creates coordinate axes around the player
     * Red - positive X
     * Green - positive Y
     * Blue - positive Z
     */
    //% block
    export function make_coord_axes(): void {
        let off = 2
        let x_axis = RED_CONCRETE
        let y_axis = GREEN_CONCRETE
        let z_axis = BLUE_CONCRETE
        
        for (let i = 0; i < 5; i++) {
            blocks.place(x_axis, pos(off + i, 0, 0))
            blocks.place(y_axis, pos(0, off + i, 0))
            blocks.place(z_axis, pos(0, 0, off + i))
        }
        
        let nl = "\n"
        player.say(
            "Axes: "      + nl + 
            "Red    : +X" + nl + 
            "Green : +Y"  + nl + 
            "Blue   : +Z"
        )
    };
    
    /**
     * Tell in what direction the player is currently looking, as well as other directions relative to it
     */
    //% block
    export function tell_dir(): void {
        let po = player.getOrientation()
        let pco = positions.toCompassDirection(po)
        
        let fw = ""
        let bk = ""
        let rt = ""
        let lt = ""
        let up = "+Y"
        let dn = "-Y"
        
        if (pco == EAST) {
            fw = "+X (EAST)"
            bk = "-X (WEST)"
            rt = "+Z (SOUTH)"
            lt = "-Z (NORTH)"
        } else if (pco == WEST) {
            fw = "-X (WEST)"
            bk = "+X (EAST)"
            rt = "-Z (NORTH)"
            lt = "+Z (SOUTH)"
        } else if (pco == SOUTH) {
            fw = "+Z (SOUTH)"
            bk = "-Z (NORTH)"
            rt = "-X (WEST)"
            lt = "+X (EAST)"
        } else if (pco == NORTH) {
            fw = "-Z (NORTH)"
            bk = "+Z (SOUTH)"
            rt = "+X (EAST)"
            lt = "-X (WEST)"
        }
        
        let nl = "\n"
        
        // different spacing is needed for the text
        // to look better in the chat with the 
        // non-monospace Mojangles font
        player.say(
            "Directions: "      + nl + 
            "FORWARD : "   + fw + nl + 
            "BACK     : "  + bk + nl + 
            "RIGHT    : "  + rt + nl + 
            "LEFT     : "  + lt + nl + 
            "UP        : " + up + nl + 
            "DOWN     : "  + dn
        )
    };
    
    /**
     * Registers helper chat commands and starts the countdown
     * @param countdown length of the pause in seconds before executing the code
     */
    //% block
    export function begin(countdown: number = 0): void {
        player.onChat("agent", () => {
            lesson.agent_face()
        })

        player.onChat("axes", () => {
            lesson.make_coord_axes()
        })
        
        player.onChat("dir", () => {
            lesson.tell_dir()
        })

        // countdown after which user code execution starts
        let pause = 1000 // ms
        for (let i = countdown; i > 0; i--) {
            player.say(`${i}...`)
            loops.pause(pause)
        }
        player.say("Start!")
    };
}
