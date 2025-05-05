import Button from '@/components/tiffui/Button'
import Flex from '@/components/tiffui/Flex'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/tiffui/Popover'

import { RiSendPlaneFill } from 'react-icons/ri'
import { Input } from '../../components/tiffui/Input'
import { Label } from '../../components/tiffui/Label'
const RadixPage = () => {
    return (
        <div className="flex p-4 gap-4 flex-col w-fit">
            <h1 className="text-white font-semibold  text-2xl">Buttons</h1>
            <div className="grid grid-cols-4 gap-3">
                <Button>Change Password</Button>
                <Button variant="destructive">Delete Account</Button>
                <Button variant="outline">Settings</Button>
                <Button variant="secondary">User Profile</Button>
                <Button variant="ghost">Account Info</Button>
                <Button variant="link">Change Email</Button>
                <div className="col-span-2"></div>
                <Button variant="submit" size="xl">
                    <RiSendPlaneFill /> Submit
                </Button>
            </div>

            <h1 className="text-white font-semibold  text-2xl">Popover</h1>
            <Popover>
                <PopoverTrigger className="w-fit">Leave Server</PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-fit">
                    <h1>Do You Wanna Leave Server?</h1>
                    <div className="flex gap-2 mt-4 ml-auto">
                        <Button variant="destructive">Leave</Button>
                        <Button variant="secondary">Cancel</Button>
                    </div>
                </PopoverContent>
            </Popover>

            <h1 className="text-white font-semibold z-10 text-2xl">Flex</h1>
            <div className="max-w-sm p-2 bg-zinc-900 ">
                <Flex
                    wrap="wrapReverse"
                    direction="row"
                    className="w-fit gap-2"
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Button variant={'ghost'} key={i}>
                            Button {i}
                        </Button>
                    ))}
                </Flex>
            </div>
            <div className="w-fit flex flex-col gap-4">
                <h1 className="text-white font-semibold z-10 text-2xl">
                    Label
                </h1>
                <Label>Your email</Label>
                <Input type="email" placeholder="ram@ram.com" />
            </div>
        </div>
    )
}
export default RadixPage
