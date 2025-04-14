import ServersSidebar from '@/modules/server/Sidebar'
import { Flex } from '@radix-ui/themes'

const ServersLayout = () => {
    return (
        <Flex direction="row" className="h-screen w-screen">
            <ServersSidebar />
        </Flex>
    )
}
export default ServersLayout
