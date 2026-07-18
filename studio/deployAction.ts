import {useState} from 'react'
import type {DocumentActionComponent, DocumentActionsContext} from 'sanity'

export const DEPLOYMENT_REQUEST_ID = 'site-deployment-request'

export const createDeployWebsiteAction = (
  getClient: DocumentActionsContext['getClient'],
): DocumentActionComponent => () => {
  const client = getClient({apiVersion: '2026-07-18'})
  const [deploying, setDeploying] = useState(false)

  return {
    label: deploying ? 'Starting deployment…' : 'Deploy website',
    title: 'Build the published website on Netlify',
    disabled: deploying,
    onHandle: async () => {
      setDeploying(true)
      try {
        await client.createOrReplace({
          _id: DEPLOYMENT_REQUEST_ID,
          _type: 'deploymentRequest',
          requestedAt: new Date().toISOString(),
        })
        window.alert('Deployment requested. Check Netlify for its progress.')
      } catch (error) {
        console.error(error)
        window.alert('Could not request a deployment. Please try again.')
      } finally {
        setDeploying(false)
      }
    },
  }
}
