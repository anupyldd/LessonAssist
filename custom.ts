
namespace agent {
    /**
     * Teleports the agent to player's position facing the same direction as the player
     */
    //% block
    export function join(): void {
        agent.teleport(
            player.position(),
            positions.toCompassDirection(player.getOrientation())
        )
    };

    /**
     * Registers helper chat commands and starts the countdown
     * @param countdown length of the pause in seconds before executing the code
     */
    //% block
    export function begin(countdown: number = 3): void {
        player.onChat("join", () => {
            agent.join()
        })

        player.onChat("left", () => {
            agent.turnLeft()
        })

        player.onChat("right", () => {
            agent.turnRight()
        })

        // countdown after which user code execution starts
        let pause = 1000 // ms
        for (let i = countdown; i > 0; i--) {
            player.say(`${i}...`)
            loops.pause(pause)
        }
        player.say("Start!")
    }
}
