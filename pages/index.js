import React,  { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react"

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [website, setWebsite] = useState([])
  const [websiteName, setwebsiteName] = useState('')
  const [websiteLink, setwebsiteLink] = useState('')
  const initialRef = React.useRef()

  function onClosehandle () {
    setwebsiteName('')
    setwebsiteLink('')
    onClose ()
  }

  function onAddhandle () {
    let websiteList = []
    let colors = ['red','blue','green','orange','pink','black','gray'];
    let c=Math.floor(Math.random()*5);  
    websiteList = [...website, {
      title: websiteName.slice(0,12),
      titleIcon: websiteName.slice(0,1),
      link: websiteLink,
      colors: colors[c]
    }]
    
      setWebsite(websiteList)
      onClosehandle()
    }


  return (
    <div className={styles.container}>
      <Head>
        <title>新标签页</title>
      </Head>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClosehandle}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>名称</FormLabel>
              <Input ref={initialRef} value={websiteName}  onChange={e => setwebsiteName(e.target.value)}   />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>网址</FormLabel>
              <Input value={websiteLink}   onChange={e => setwebsiteLink(e.target.value)}  />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" onClick={onClosehandle} w={20} mr={3}>取消</Button>
            <Button onClick={() => onAddhandle()} size="sm" disabled={websiteName === '' || websiteLink === ''} colorScheme="blue" w={20}>
              完成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <main className={styles.main}>
        <div className={styles.logo}>
            <Image src="/google_logo.svg" alt="google Logo" width={272} height={92} />
        </div>
       <div className={styles.inputWrapper}>
         <div className={styles.searchicon}></div>
         <input type="search" autocomplete="off" spellcheck="false" aria-live="polite" placeholder="在 Google 上搜索，或者输入一个网址" className={styles.search} />
         <div className={styles.voiceSearchButton}></div>
       </div>

       <div className={styles.mostVisited}>
{ website.map((item, index) => (
         <a className={styles.tile} href={item.link}
         title={item.title}
         key={index}>
                <div className={styles.iconmorevert} >
                  <div className={styles.icon} ><div
                    className={styles.maskedImage} >
                  </div>
                    </div>
                </div>
         <div className={styles.tileicon}> 
            <span style={{ backgroundColor: item.colors }}>{item.titleIcon}
            </span>   
         </div>
           <div className={styles.tiletitle}><span>{item.title}</span></div>
           </a>
           ))
        }
         <a className={styles.tile} onClick={onOpen}>
           
         <div className={styles.tileicon}> <img src="/add.svg" width="24" height="24" />  
         </div>
           <div className={styles.tiletitle}><span>添加快捷方式</span></div>
           </a>
       </div>
      </main>
    </div>
    
  )
}
