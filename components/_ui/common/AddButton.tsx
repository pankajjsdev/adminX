import { Button } from "@/components/ui/button"
import Link from "next/link"

function AddButton({ link }: { link: string }) {
    return (
        <Link href={link} className="btn btn-p">
            <Button type="button">Create new</Button>
        </Link>

    )
}

export default AddButton