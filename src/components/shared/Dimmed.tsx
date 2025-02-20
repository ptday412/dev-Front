import styled from "@emotion/styled"

interface DimmedProps {
    children: React.ReactNode
    onClick?: () => void
}

const Dimmed = ({ children, onClick }: DimmedProps) => {
    return <Container onClick={onClick}>{children}</Container>
}

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
`

export default Dimmed
